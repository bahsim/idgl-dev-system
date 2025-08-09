# WishListShare: Expert-Level Backend Documentation

This documentation provides a comprehensive, expert-level overview of the WishListShare wishlist service backend. It includes conceptual documentation, architectural diagrams, API flows, business rules, and actionable recommendations for onboarding, architecture review, and extensibility.

---

## Project Mission and Context

WishListShare is a gift wishlist service that enables collective gift-giving through community funding. This modular, scalable backend is built with NestJS and TypeORM, implementing sophisticated business rules for gift management, offer processing, and localization. 

**Key Features:**
- **Collective Gift Funding:** Users contribute money toward others' desired gifts
- **Localization Support:** Full internationalization support and cultural context
- **Advanced Privacy Controls:** Optional anonymity and owner-based data filtering
- **Sophisticated Business Logic:** Complex validation, transaction management, and security patterns

This documentation is intended for backend and full-stack developers, architects, and contributors who need comprehensive understanding of the system's design, business logic, cultural context, and advanced implementation patterns.

---

## Documentation Map

| File                        | Description                                                                                       |
|-----------------------------|---------------------------------------------------------------------------------------------------|
| [architecture.md](./architecture.md)           | High-level architecture, module structure, global patterns, and system diagrams                 |
| [domain-models.md](./domain-models.md)         | Entity relationships, data model diagrams, validation rules, and advanced notes                |
| [service-responsibilities.md](./service-responsibilities.md) | Service responsibilities, business logic, and cross-cutting concerns                            |
| [controller-endpoints.md](./controller-endpoints.md)         | API endpoints, routes, request/response patterns, and guard usage                               |
| [business-rules.md](./business-rules.md)       | **NEW** Comprehensive business constraints, validation logic, and complex rules                 |
| [localization-context.md](./localization-context.md) | **NEW** Cultural context, linguistic elements, and regional considerations                     |
| [implementation-patterns.md](./implementation-patterns.md) | **NEW** Advanced technical patterns, security implementations, and optimization techniques       |
| [concept-analysis.md](./concept-analysis.md)   | **NEW** Comprehensive gap analysis and documentation completeness assessment                    |
| [api-flows.md](./api-flows.md)                 | Sequence diagrams and business process flows for key API operations                             |
| [recommendations.md](./recommendations.md)     | Best practices, extensibility, onboarding checklist, and advanced recommendations               |

All diagrams are provided in Mermaid format for easy visualization and future updates. Cross-links between files help you quickly navigate related topics.

---

## Key Architectural Decisions

- **Modular Design:** Each domain (users, wishes, wishlists, offers, auth) is encapsulated in its own module for clarity and extensibility.
- **Service Layer:** Business logic is encapsulated in services, not controllers, to ensure single responsibility and testability.
- **DTO Validation:** All input/output is validated using class-validator decorators for security and data integrity.
- **Authentication & Authorization:** JWT and local strategies are used, with guards enforcing access control at the controller/method level.
- **Database:** PostgreSQL with TypeORM, using auto-sync for development and migrations for production.
- **Error Handling:** Centralized with global exception filters for consistent API responses.
- **Documentation:** All API flows, business rules, and architectural decisions are documented and kept up to date.

---

## How to Contribute and Maintain Documentation

- **Update Diagrams:** All diagrams are in Mermaid format. Use the [Mermaid Live Editor](https://mermaid-js.github.io/mermaid-live-editor/) to view or update diagrams, then paste the updated code back into the relevant markdown file.
- **Extend Documentation:** When adding new features or modules, update the relevant sections and cross-links. Follow the structure and style of existing docs.
- **Review Process:** All documentation changes should be reviewed by another developer for accuracy and clarity before merging.
- **Keep Up to Date:** Update documentation as the system evolves, especially when making architectural or business logic changes.

---

## FAQ for Onboarding

**Q: How do I set up the backend and frontend locally?**
A: Follow the onboarding checklist below. Set up the database, install dependencies, and run both backend and frontend in dev mode.

**Q: Where can I find the API endpoints and their expected request/response formats?**
A: See [controller-endpoints.md](./controller-endpoints.md) for a full list of endpoints, methods, and patterns.

**Q: How do I understand the relationships between entities?**
A: See [domain-models.md](./domain-models.md) for detailed field, relationship, and validation info, plus ER diagrams.

**Q: How do I contribute to the documentation?**
A: Edit the relevant markdown file, preview changes locally, and submit a pull request for review.

**Q: How do I generate or update diagrams?**
A: Use the Mermaid Live Editor or VSCode Mermaid Preview extension. Paste the updated diagram code into the markdown file.

**Q: How do I generate or update API documentation?**
A: Use NestJS Swagger integration to generate live API docs. Update [controller-endpoints.md](./controller-endpoints.md) as needed.

---

## How to Generate/Update Diagrams and API Docs

- **Mermaid Diagrams:**
  1. Copy the Mermaid code block from the markdown file.
  2. Paste it into the [Mermaid Live Editor](https://mermaid-js.github.io/mermaid-live-editor/) or use a VSCode extension.
  3. Edit as needed, then copy the updated code back into the markdown file.
- **Swagger/OpenAPI Docs:**
  1. Use the NestJS Swagger module to generate live API documentation.
  2. Keep [controller-endpoints.md](./controller-endpoints.md) in sync with the Swagger output.

---

## Value and Next Steps

This documentation provides a clear, structured, and actionable overview of the backend's architecture, responsibilities, and API surface. It is valuable for onboarding new developers, conducting architecture reviews, and planning future enhancements or refactoring.

**Next steps:**
- Review and validate the documentation for completeness and accuracy.
- Use as a foundation for further enrichment (e.g., add diagrams, sequence flows, or business rules).
- Keep the documentation up to date as the system evolves.

---

## Onboarding Checklist
- Review this documentation and diagrams.
- Set up the database and environment variables.
- Run the backend and frontend locally.
- Use Swagger or Postman to explore the API.
- Follow the modular structure for any new features.
- Write and run tests before merging changes.

> This documentation is a living reference. Update it as the system evolves to ensure ongoing clarity and maintainability. 