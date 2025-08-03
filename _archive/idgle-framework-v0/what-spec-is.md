“Spec” is simply shorthand for “specification.”  
In software, AI, and product development a specification is the authoritative, written description of intent:

1. What you are trying to build or make a system do (functional requirements, success criteria).  
2. Why it should behave that way (values, safety constraints, business rules).  
3. How you will know you’ve succeeded (tests, evaluation prompts, acceptance criteria).

Key points highlighted in the talk you quoted:

• Primary artifact, not side material – The spec captures all of the structured communication that normally lives in whiteboards, meetings, documents, and people’s heads. Code is then a downstream, potentially lossy translation of that richer intent.  
• Human alignment first – Because a spec is written in natural language (often Markdown), everyone—engineers, product managers, lawyers, policy or safety teams—can read, debate, version-control, and agree on the same source of truth.  
• Machine alignment next – A well-formed spec can be fed directly to large models as context, used as eval prompts, or turned into reinforcement signals (as in OpenAI’s “deliberative alignment” paper) so the model internalizes the organization’s policy.  
• Executable/documented – Specifications should include concrete edge-case prompts or unit tests. If the model or code fails those tests, you’ve found a bug in the implementation, not the spec.  
• Reusable & composable – Like code libraries, specs can be split into modules (e.g., security, privacy, UX guidelines) and imported across projects.

Typical flavors you’ll encounter:

• Product spec – user stories, flow diagrams, KPIs.  
• Technical/architecture spec – interfaces, data contracts, scalability and performance budgets.  
• Safety or governance spec – red-team prompts, legal constraints, ethical boundaries (e.g., the publicly released OpenAI Model Spec).  
• Test spec – formal input/output pairs, property-based assertions.

When someone asks, “Where’s the spec?” they’re looking for that single, version-controlled document (or set of Markdown files) that lays out the above in unambiguous terms.