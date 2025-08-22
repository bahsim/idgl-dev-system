# Meeting Follow-Up Generation - IDGL Specification

## 🎯 Objective

**Enable teams to generate meeting follow-up documentation based on actual meeting content rather than predefined templates.**

## 🧠 Rationale

**Current Problem:**
- Meeting follow-up documentation is often generic and template-forced
- Output doesn't match actual meeting content or serve team needs
- Teams waste time trying to fit meeting reality into predefined formats

**Why This Approach:**
- **Content-driven generation** starts with actual meeting content rather than templates
- **Meeting type identification** can inform documentation structure choices
- **Flexible output structure** can adapt to different meeting types
- **Team needs consideration** focuses on what teams might need from follow-up

## ✅ Verification Criteria

### 🎯 Input Quality
- [ ] **Raw Meeting Data:** Meeting transcript or recording is provided and readable
- [ ] **Content Completeness:** All mentioned action items, decisions, and key points are captured
- [ ] **Participant Information:** All speaker names are identified and attributed to their statements

### 📋 Generation Process
- [ ] **Context Extraction:** AI automatically extracts meeting type, participants, purpose, and agenda from raw data
- [ ] **Quick Confirmation:** AI presents extracted context for user confirmation (1-2 questions max, skippable)
- [ ] **Content Analysis:** Key themes, decisions, and action items are extracted from meeting content
- [ ] **Format Selection:** Output format is selected based on meeting type and available content
- [ ] **Immediate Generation:** MFU documentation is generated regardless of context confirmation status

### 📊 Output Quality
- [ ] **Content Alignment:** Output contains exactly these sections in order: Action Items, Key Decisions, Next Steps, Context
- [ ] **Action Items:** Each action item includes: Task description, Owner name, Due date (if mentioned), Priority level (High/Medium/Low) based on urgency indicators
- [ ] **Knowledge Capture:** Key information is organized into: Technical Details, Business Context, Background Information
- [ ] **Format Appropriateness:** Output uses markdown format with ## headers for main sections and ### for subsections
- [ ] **Content Completeness:** All content from meeting is accounted for in output (no information lost)

## 🚀 Success Indicators

**When the follow-up generation is working:**
- All action items from the meeting are captured with clear ownership and priority levels
- Key decisions are documented with context and rationale
- Meeting knowledge is organized into logical sections with proper markdown formatting
- All meeting content is preserved and organized (no information lost)
- Documentation can be used immediately by team members without additional processing

## 🔧 What Teams Need

**To implement this approach:**
- Raw meeting data (transcript or recording)
- AI agent configured with MFU Generation Boot Config
- Optional context confirmation (AI-driven, minimal interaction)

---

**Note:** This specification defines the Meeting Follow-Up Generation approach as an executable framework that teams can implement, measure, and continuously improve. Implementation guidance is provided in the MFU Generation Boot Config. This is the canonical specification for meeting follow-up generation across the organization.
