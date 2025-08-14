# Component Spec: The Presentation Suite

## 1. Objective
To provide a compelling, narrative-driven presentation of the IDGL framework for the purpose of advocacy and education. This component answers the question, "How do we persuade others of the value of IDGL?"

## 2. Rationale
A technical documentation system is not sufficient for driving adoption. A persuasive, high-level narrative is required to communicate the core "why" to leaders, stakeholders, and new team members.

This component serves as the primary communication instrument for the IDGL. It translates the dense technical documentation into a clear, concise, and powerful story, using the "Gambler vs. Architect" metaphor to make the concepts accessible and memorable. It includes both the visual presentation (Marp markdown) and the detailed speaker's script, providing a complete package for anyone needing to champion the IDGL.

## 3. Verification Criteria
This component is considered complete and correct if it consists of the following canonical artifacts. Obsolete versions (e.g., `presentation.md`, `presentation-script.md`) are considered legacy and not part of the formal component.

1.  **`presentation.v2.md`**:
    *   **Purpose:** The visual slide deck for the presentation, written in Marp markdown.
    *   **Must contain:** A sequence of slides that visually represents the core narrative, including the "Gambler vs. Architect" dichotomy, the key patterns (Plays), and the call to action (Vanguard Project / Stealth Architect).

2.  **`presentation-script.v2.md`**:
    *   **Purpose:** The formal, English-language speaker's script that accompanies the `presentation.v2.md` slides.
    *   **Must contain:** A detailed, slide-by-slide script that elaborates on the visual content, providing the full narrative and talking points for the presenter.

3.  **Translated script versions** (optional but recommended):
    *   **Purpose:** To make the presentation accessible to a wider audience.
    *   **Example Artifacts:** `presentation-script.v2.ru.md`, `presentation-script.v2.ru.informal.md`.
