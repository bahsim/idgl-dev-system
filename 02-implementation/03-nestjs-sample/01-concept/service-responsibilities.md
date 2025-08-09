# Service Responsibilities and Cross-Cutting Concerns

This document provides an expert-level summary of the main responsibilities and cross-cutting concerns for the core services in the WishListShare backend. Each section outlines the service's business logic, validation, authorization, transactionality, and separation of concerns.

---

## UsersService
**Responsibilities:**
- Create, update, find, and delete users
- Search by email, username, or about fields
- Hash passwords on update

**Cross-Cutting Concerns:**
- Uses bcrypt for password hashing
- No explicit authorization checks (assumed handled at controller/guard level)
- Uses TypeORM repository for persistence

## WishesService
**Responsibilities:**
- Create, update, find, copy, and delete wishes
- Retrieve last and top wishes with optional offer details
- Provide detailed wish view with progress and participant calculation
- Copy wishes with transactional logic

**Cross-Cutting Concerns:**
- Enforces ownership and offer existence checks before update/delete (throws ForbiddenException)
- Uses NotFoundException for missing wishes
- Uses TypeORM transactions for copy operations
- Filters offers for non-owners

## WishlistsService
**Responsibilities:**
- Create, update, find, and delete wishlists
- Associate wishlists with owners

**Cross-Cutting Concerns:**
- Enforces ownership checks before update/delete (throws ForbiddenException)
- Uses NotFoundException for missing wishlists
- Uses TypeORM repository for persistence

## OffersService
**Responsibilities:**
- Create, update, find, and delete offers for wishes
- Enforce business rules for offer creation and updates (amount, ownership, total raised)
- Update wish's raised amount after offer changes

**Cross-Cutting Concerns:**
- Delegates validation and repository logic to dedicated services
- Uses TypeORM transactions for all mutating operations
- Enforces business rules via validation service (amount, ownership, total raised)

## AuthService
**Responsibilities:**
- User signup (with password hashing and duplicate check)
- User authentication (JWT token issuance)
- Password validation

**Cross-Cutting Concerns:**
- Uses bcrypt for password hashing and comparison
- Throws BadRequestException and UnauthorizedException for error cases
- Integrates with UsersService and JwtService

---

## General Patterns
- **Validation:** Most business logic is enforced via explicit validation and exception throwing
- **Authorization:** Ownership checks are performed in service methods for sensitive operations
- **Transactionality:** TypeORM transactions are used for operations that require atomicity (e.g., copying wishes, offer creation/update/delete)
- **Separation of Concerns:** Some services (e.g., OffersService) delegate validation and repository logic to dedicated helper services 