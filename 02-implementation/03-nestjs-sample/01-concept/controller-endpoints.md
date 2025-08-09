# Controller Endpoints and API Structure

This document provides an expert-level summary of the main endpoints, routes, and responsibilities for the core controllers in the WishListShare backend. Each section outlines endpoints, HTTP methods, route patterns, notable guards, and request/response patterns.

---

## UsersController
**Base Route:** `/users`

**Endpoints:**
- `GET /me` — Get current user profile (requires JWT auth)
- `PATCH /me` — Update current user profile (requires JWT auth)
- `GET /me/wishes` — Get current user's wishes (requires JWT auth)
- `GET /:username` — Get user by username (requires JWT auth)
- `GET /:username/wishes` — Get wishes for a user by username (requires JWT auth)
- `POST /find` — Search users by query (requires JWT auth)

**Guards:** All endpoints require `JwtAuthGuard`.

---

## WishesController
**Base Route:** `/wishes`

**Endpoints:**
- `POST /` — Create a wish (requires JWT auth)
- `GET /last` — Get last wishes (optional JWT auth)
- `GET /top` — Get top wishes (optional JWT auth)
- `GET /:id` — Get wish details (optional JWT auth)
- `PATCH /:id` — Update wish (requires JWT auth, must be owner)
- `DELETE /:id` — Delete wish (requires JWT auth, must be owner)
- `POST /:id/copy` — Copy wish (requires JWT auth)

**Guards:** Uses `JwtAuthGuard`, `WishOwnerGuard`, and `OptionalJwtAuthGuard` as appropriate.

---

## WishlistsController
**Base Route:** `/wishlistlists` (should be `/wishlists`)

**Endpoints:**
- `GET /` — Get all wishlists (requires JWT auth)
- `POST /` — Create a wishlist (requires JWT auth)
- `GET /:id` — Get wishlist by ID (requires JWT auth)
- `PATCH /:id` — Update wishlist (requires JWT auth, must be owner)
- `DELETE /:id` — Delete wishlist (requires JWT auth, must be owner)

**Guards:** All endpoints require `JwtAuthGuard`.

---

## OffersController
**Base Route:** `/offers`

**Endpoints:**
- `POST /` — Create an offer (requires JWT auth)
- `GET /` — Get all offers (requires JWT auth)
- `GET /:id` — Get offer by ID (requires JWT auth)
- `PATCH /:id` — Update offer (requires JWT auth, must be owner)
- `DELETE /:id` — Delete offer (requires JWT auth, must be owner)

**Guards:** All endpoints require `JwtAuthGuard`.

---

## AuthController
**Base Route:** `/`

**Endpoints:**
- `POST /signup` — Register a new user
- `POST /signin` — Authenticate user (uses `LocalAuthGuard`)

**Guards:** `signin` uses `LocalAuthGuard`.

---

## General Patterns
- **Authentication:** Most endpoints require JWT authentication via `JwtAuthGuard`
- **Authorization:** Owner-specific operations use additional guards (e.g., `WishOwnerGuard`)
- **Request/Response:** Uses DTOs for input validation and entity classes for output
- **Route Structure:** RESTful, resource-oriented routes with clear separation by module 