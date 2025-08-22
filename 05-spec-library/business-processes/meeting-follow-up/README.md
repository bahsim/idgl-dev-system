# Meeting Follow-Up Generation - Shared Specification

This is the canonical specification for generating meeting follow-up documentation from actual meeting content. It provides a standardized, content-driven approach that teams can use consistently across the organization.

## Overview

**Purpose:** Enable teams to generate meeting follow-up documentation based on actual meeting content rather than predefined templates.

**Key Features:**
- Content-driven generation approach
- Multiple output formats (Action-Oriented, Knowledge-Focused, Hybrid, Summary)
- Quality validation against input content
- AI-executable verification criteria

## Files

- **[spec.md](./spec.md)** - The canonical specification with verification criteria
- **[definition.md](./definition.md)** - Methodology definition and core concepts
- **[README.md](./README.md)** - This usage guide

## Usage

### Quick Start

1. **Initialize AI with MFU Boot Config:**
   - Use the [MFU Generation Boot Config](../../../04-ai-agent-boot-config/domain-specific-configs/mfu-generation-boot-config.yaml)
   - The boot config includes a default spec for immediate use

2. **Apply the Specification:**
   - **Option A (Default):** Use the embedded default spec in the boot config
   - **Option B (Override):** Provide this shared spec to override the default
   - **Option C (Custom):** Provide your own custom spec

3. **Validate Results:**
   - Check against verification criteria in the spec
   - Ensure all required sections are present
   - Verify content completeness and format

### Usage Patterns

#### Basic Usage (Zero Friction)
- Download MFU boot config
- Initialize AI agent
- Use immediately with embedded default spec

#### Shared Usage (Organizational Standard)
- Download MFU boot config
- Reference this shared spec
- Boot config uses shared spec instead of default

#### Custom Usage (Team-Specific)
- Download MFU boot config
- Create custom spec for team needs
- Boot config uses custom spec instead of default

### Expected Output

The spec defines these required sections in order:
1. **Action Items** - Task description, Owner name, Due date, Priority level
2. **Key Decisions** - Decisions made with context and rationale
3. **Next Steps** - Immediate follow-up actions
4. **Context** - Technical Details, Business Context, Background Information

**Format:** Markdown with ## headers for main sections and ### for subsections

## Integration

### With MFU Boot Config
This spec is designed to work with the MFU Generation Boot Config, which provides:
- Specialized agent protocols (Content Analyst, Documentation Generator, etc.)
- MFU-specific patterns and workflows
- Quality validation protocols
- Default specification for immediate use
- Spec override mechanism for customization

### With IDGL Framework
- Follows IDGL principles (Spec → Generate → Validate → Refine)
- Uses agent protocols for implementation
- Maintains audit trail through structured process

## Quality Standards

This spec meets all library quality standards:
- ✅ **AI-Executable** - Clear verification criteria for AI implementation
- ✅ **Human-Validatable** - Measurable success indicators
- ✅ **Comprehensive** - Covers input quality, generation process, and output quality
- ✅ **Practical** - Proven through real implementation examples
- ✅ **Maintainable** - Clear structure and documentation

## Examples

See the [MFU Generation Implementation](../../../02-implementation/05-mfu-generation/) for complete examples including:
- Real meeting transcript processing
- Generated documentation examples
- Implementation workflow demonstration

## Contributing

This spec is maintained as part of the IDGL Spec Library. To suggest improvements:
1. Test with real meeting content
2. Validate against verification criteria
3. Ensure AI-executability is maintained
4. Update documentation as needed

---

**Note:** This spec represents the "gold standard" for meeting follow-up generation and should be used consistently across all teams to ensure quality and consistency.
