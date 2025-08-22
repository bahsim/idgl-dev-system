# Domain-Specific Boot Configurations

This directory contains specialized IDGL boot configurations that are tailored to specific domains while maintaining the core IDGL methodology.

## Overview

Domain-specific boot configurations provide focused expertise for particular use cases while preserving the proven IDGL framework. Each configuration:

- **Maintains core IDGL principles** (Spec → Generate → Validate → Refine)
- **Adds domain-specific patterns** and agent protocols
- **Removes irrelevant elements** from the generic config
- **Provides extensibility** for future domain needs

## When to Use Domain-Specific vs Generic Configs

### **Use Domain-Specific Configs When:**
- You're working in a specialized domain with unique requirements
- You need domain-specific agent protocols and patterns
- You want to avoid confusion from irrelevant generic patterns
- You're building focused tools for specific use cases
- You want zero-friction setup with embedded default specifications

### **Use Generic Config When:**
- You're doing general software development
- You're learning IDGL for the first time
- You need flexibility across multiple domains
- You're building tools that span different types of work
- You need to create custom specifications from scratch

## Available Configurations

### [MFU Generation Boot Config →](./MFU-USER-GUIDE.md)

**Purpose:** Meeting Follow-Up documentation generation

**Key Features:**
- Content analysis and quality assessment
- Meeting type classification
- Output format selection
- Documentation generation workflows
- Quality validation protocols
- **Default specification included** for immediate use
- **Spec override mechanism** for customization

**Agent Protocols:**
- Content Analyst
- Documentation Generator
- Meeting Type Classifier
- Quality Validator

**Use Cases:**
- Converting meeting transcripts to structured follow-ups
- Generating action items and decision records
- Creating knowledge transfer documentation
- Quality validation of meeting documentation

**Usage Patterns:**
- **Basic:** Download and use immediately with embedded default spec
- **Custom:** Override with team-specific specifications
- **Shared:** Use organizational standard from spec library

**Related Implementation:**
- **[Complete MFU Implementation](../../02-implementation/05-mfu-generation/)** - Full implementation with specs, definitions, and examples

## Analysis and Documentation

### [Domain-Specific Boot Config Analysis](./domain-specific-boot-config-analysis.md)

Comprehensive analysis of the decision to use domain-specific configurations vs. generic ones, including:

- Detailed arguments for both approaches
- Implementation structure and process
- Guidelines for creating new domain-specific configs
- Validation criteria and best practices

## Creating New Domain-Specific Configs

### Process Overview

1. **Analyze Domain Requirements**
   - Identify unique challenges and needs
   - Determine required patterns and protocols
   - Assess what can be removed from generic config

2. **Copy and Modify Generic Config**
   - Start with `../idgl-boot-config.yaml` as template
   - Remove irrelevant patterns and protocols
   - Add domain-specific elements
   - Update examples and descriptions

3. **Document the Reasoning**
   - Create analysis document explaining decisions
   - Include arguments for domain-specific approach
   - Document implementation structure

4. **Validate the Config**
   - Test with domain-specific use cases
   - Ensure IDGL core principles are maintained
   - Verify extensibility for future needs

### File Naming Convention

- Config files: `[domain-name]-boot-config.yaml`
- Analysis files: `[domain-name]-boot-config-analysis.md`
- README files: `README.md` (in domain subdirectories if needed)

## Integration with IDGL

Domain-specific configs are designed to work seamlessly with the broader IDGL ecosystem:

- **Compatible with all IDGL patterns** and communication principles
- **Extensible** for future domain needs
- **Maintainable** through the same processes as generic configs
- **Documented** with clear reasoning and analysis

## Contributing

When creating new domain-specific configurations:

1. Follow the established process and naming conventions
2. Include comprehensive analysis documentation
3. Test thoroughly with domain-specific use cases
4. Ensure compatibility with core IDGL principles
5. Document extensibility considerations

## Related Documentation

- **[Generic IDGL Boot Config](../idgl-boot-config.yaml)** - Universal configuration
- **[Boot Config Instructions](../instruction.md)** - Process for creating configs
- **[IDGL Core Documentation](../../)** - Framework fundamentals
- **[MFU Generation Implementation](../../02-implementation/05-mfu-generation/)** - Complete implementation example
