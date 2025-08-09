# API Flows and Business Processes

This document provides sequence diagrams and business process flows for key API operations in the WishListShare backend.

---

## Registration & Authentication

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant BE as Backend
  participant DB as Database

  U->>FE: Fills registration form
  FE->>BE: POST /signup (user data)
  BE->>DB: Validate, hash password, create user
  BE-->>FE: Success/failure response
  U->>FE: Fills login form
  FE->>BE: POST /signin (username, password)
  BE->>DB: Validate credentials
  BE-->>FE: JWT token or error
```

---

## Gift Contribution Flow

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant BE as Backend
  participant DB as Database

  U->>FE: Selects a wish to contribute
  FE->>BE: POST /offers (wishId, amount, hidden)
  BE->>DB: Validate wish, check not owner, check not fully funded
  BE->>DB: Create offer, update wish.raised
  BE-->>FE: Success/failure response
  FE-->>U: Show updated wish progress
```

---

## Wish Copy Flow

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant BE as Backend
  participant DB as Database

  U->>FE: Clicks 'Copy Wish'
  FE->>BE: POST /wishes/:id/copy
  BE->>DB: Find wish, duplicate for user, increment copied count
  BE-->>FE: New wish data
  FE-->>U: Show wish in user's profile
``` 