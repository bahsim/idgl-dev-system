"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
const glob_1 = require("glob");
// A more robust and specific parsing function
const parseMarkdown = (content) => {
    const sections = {};
    const lines = content.split('\n');
    let currentKey = 'prologue'; // Content before the first header
    sections[currentKey] = [];
    lines.forEach(line => {
        const h2Match = line.match(/^##\s*(?:\d+\.\s*)?(.+)/);
        if (h2Match) {
            currentKey = h2Match[1].trim();
            sections[currentKey] = [];
        }
        else {
            sections[currentKey].push(line);
        }
    });
    // Join the lines back together and trim whitespace
    for (const key in sections) {
        sections[key] = sections[key].join('\n').trim();
    }
    return sections;
};
// Main function to build the config
async function buildConfig() {
    try {
        console.log('Starting boot config build...');
        // --- File Paths ---
        const basePath = path.resolve(__dirname, '../../..');
        const corePath = path.join(basePath, '00-core.md');
        const philosophyPath = path.join(basePath, '00-idgl-philosophy.md');
        const commsPath = path.join(basePath, '04-communication-principles.md');
        const protocolsPath = path.join(basePath, '03-agent-protocols');
        // --- Config Object ---
        const config = {
            version: '1.0.0',
            description: 'IDGL AI Agent Boot Configuration',
        };
        // 1. IDGL Framework
        console.log('Parsing IDGL framework...');
        config.idgl_framework = {
            core_paradigm: await fs.readFile(corePath, 'utf-8'),
            architects_mindset: await fs.readFile(philosophyPath, 'utf-8'),
        };
        // 2. Master Protocol
        console.log('Parsing master protocol...');
        const masterContent = await fs.readFile(path.join(protocolsPath, '00-protocol-master.md'), 'utf-8');
        const masterSections = parseMarkdown(masterContent);
        config.master_protocol = {
            purpose: masterSections['Core Identity'],
            default_mode: masterSections['Default Mode of Operation'],
        };
        // 3. Glossary
        console.log('Parsing glossary...');
        const sharedContent = await fs.readFile(path.join(protocolsPath, '00-protocol-shared-concepts.md'), 'utf-8');
        const glossaryContent = parseMarkdown(sharedContent)['Core Glossary'];
        config.glossary = glossaryContent.split(/^\s*\*\s\*\*(.+?):/gm).slice(1).reduce((acc, val, i, arr) => {
            if (i % 2 === 0) {
                acc.push({ term: val.trim(), definition: arr[i + 1].trim() });
            }
            return acc;
        }, []);
        // 4. Agent Protocols
        console.log('Parsing agent protocols...');
        const protocolFiles = await (0, glob_1.glob)(path.join(protocolsPath, '0[1-5]-*.md'));
        config.agent_protocols = await Promise.all(protocolFiles.map(async (pPath) => {
            const content = await fs.readFile(pPath, 'utf-8');
            const sections = parseMarkdown(content);
            const protocolName = path.basename(pPath).match(/protocol-(.+)\.md/)?.[1].replace(/-/g, ' ') || 'Unknown';
            return {
                role_name: protocolName.charAt(0).toUpperCase() + protocolName.slice(1),
                objective: sections['Core Identity & Objective'],
                workflow: sections['Mode of Operation'],
                rules_of_engagement: (sections['Rules of Engagement (Behavioral Directives)'] || '').split('\n').map((s) => s.replace(/^\*\s*/, '').trim()).filter(Boolean),
                trigger_prompts: (sections['Trigger Prompts'] || '').split('\n').map((s) => s.replace(/^\*\s*/, '').trim()).filter(Boolean),
            };
        }));
        // 5. Communication Playbook
        console.log('Parsing communication playbook...');
        const commsContent = await fs.readFile(commsPath, 'utf-8');
        const commsPlays = commsContent.split('###').slice(1).map(section => {
            const lines = section.trim().split('\n');
            const nameMatch = lines[0].match(/\d+\.\s(.+)/);
            const name = nameMatch ? nameMatch[1].trim() : 'Unknown Play';
            const description = lines.slice(1).find(line => !line.startsWith('*'))?.trim() || '';
            const scenario = lines.find(line => line.includes('When to Run'))?.split(':')[1].trim() || '';
            const examples = lines.filter(line => line.trim().startsWith('*   `"')).map(line => line.trim().substring(5, line.trim().length - 1));
            return {
                play_name: name,
                description: description,
                usage_scenario: scenario,
                example_invocations: examples
            };
        });
        config.communication_playbook = commsPlays;
        // --- Write YAML file ---
        const yamlString = yaml.dump(config, { indent: 2, lineWidth: -1, noRefs: true });
        const outputPath = path.resolve(__dirname, '../../dist/idgl-boot-config.yaml');
        await fs.writeFile(outputPath, yamlString);
        console.log(`✅ Boot config successfully generated at: ${outputPath}`);
    }
    catch (error) {
        console.error('❌ Error building boot config:', error);
        process.exit(1);
    }
}
buildConfig();
