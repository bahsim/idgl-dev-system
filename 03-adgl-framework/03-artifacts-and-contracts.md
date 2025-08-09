### Artifacts and Contracts
Define the specific documents and machine-readable contracts that are generated and used throughout the lifecycle. These artifacts are the glue that holds the ADGL together.

* **Intent Specification Document**: A formal, structured document that captures the human's high-level goal and constraints. It should include the project's purpose, scope, and key success criteria.
* **Decomposition Plan**: The agent-generated plan that breaks the intent into smaller sub-tasks. It should include task dependencies, the assigned agent for each task, and the contracts that link them.
* **Contracts**: Define the different types of contracts, such as **API specifications (OpenAPI)**, **database schemas**, and **data transfer objects (DTOs)**. Emphasize that these contracts are the primary communication method between agents.
* **Audit Log**: The immutable record of the agent's actions, reasoning, and self-correction attempts. This is crucial for debugging, compliance, and human oversight.