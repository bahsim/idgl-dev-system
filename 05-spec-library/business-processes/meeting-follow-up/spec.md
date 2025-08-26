# Meeting Follow-Up Generation - IDGL Specification

## 🎯 Objective

Generate meeting follow-up documentation with dual-format output for immediate action and comprehensive knowledge transfer.

## 🧠 Rationale

Content-driven generation prevents template forcing. Dual-format serves both immediate action and knowledge transfer. Name resolution prevents participant confusion and task assignment errors.

## ✅ Verification Criteria

### Name Resolution
- Extract complete participant names from meeting transcripts
- Resolve name variations consistently (e.g., 'Sergei' → 'Sergii Volodko')
- Use FULL NAMES throughout all documentation
- Resolve role-based references using context
- Prevent participant confusion through consistent naming

### Dual Format Generation
- Generate Action Plan (short format) with IMMEDIATE/NEXT/LATER priorities
- Generate Enriched Version (full format) with complete context
- Include executive summary with priority-based organization
- Use checkbox format for action items tracking

### Content Requirements
- Each action item: Task description, Owner (FULL NAME), Due date, Priority
- Decisions needed with owners (FULL NAMES)
- Contact list with purposes (FULL NAMES)
- Priority indicators: 🚨 IMMEDIATE, 🔧 NEXT, 📋 LATER
- Technical knowledge preservation in Enriched Version

### Format Structure
- Markdown with ## headers for sections, ### for subsections
- Contact Format: Name - Purpose/Context (FULL NAMES)
- Question Format: Numbered list of key questions
- Source attribution with FULL NAMES for context

## 🚀 Success Indicators

When the follow-up generation is working:
- Teams can start working without additional meetings
- Most urgent items are clearly marked and organized
- All necessary contacts are listed with clear purposes (FULL NAMES)
- Blocking dependencies are identified and tracked
- Technical knowledge is captured and accessible
- Context is maintained for future reference
- Both short and full versions serve their intended purposes
- All participants are identified by full names to prevent confusion
- Task assignments are validated against participant roles and responsibilities

---

**Note:** This specification defines the Meeting Follow-Up Generation approach as an executable framework that teams can implement, measure, and continuously improve. Implementation guidance is provided in the IDGL Boot Config. This is the canonical specification for meeting follow-up generation across the organization.
