# Business Rules and Constraints

This document captures the comprehensive business rules and constraints for the WishListShare wishlist service, extracted from detailed codebase analysis. These rules enforce the core business logic that was missing from initial concept documentation.

---

## Wish Management Rules

### **Ownership and Editing Constraints**
- **Rule WM-001:** Users can only edit/delete their own wishes
- **Rule WM-002:** Cannot edit wish price or description if any offers exist
- **Rule WM-003:** Cannot delete wishes that have existing offers
- **Rule WM-004:** Wish raised amount is automatically calculated and cannot be manually edited

### **Wish Copying Logic**
- **Rule WM-005:** Any authenticated user can copy any wish to their profile
- **Rule WM-006:** Copying creates a new wish with reset counters (copied: 0, raised: 0)
- **Rule WM-007:** Copying increments the original wish's `copied` counter atomically
- **Rule WM-008:** Copied wishes maintain all original data except ownership and counters

### **Implementation Pattern:**
```typescript
// From WishesService.copyWish()
return this.wishRepository.manager.transaction(
  async (manager: EntityManager) => {
    // Atomic copy operation with counter increment
    await manager.update(Wish, wishId, {
      copied: (wish.copied || 0) + 1,
    });
  }
);
```

---

## Offer Management Rules

### **Offer Creation Constraints**
- **Rule OM-001:** Users cannot create offers on their own wishes
- **Rule OM-002:** Offer amount cannot exceed (wish.price - wish.raised)
- **Rule OM-003:** Total raised amount cannot exceed wish price
- **Rule OM-004:** Offers are immutable - cannot be edited or deleted after creation

### **Offer Visibility Rules**
- **Rule OM-005:** Offers can be marked as `hidden` to hide contributor identity
- **Rule OM-006:** Hidden offers still contribute to raised amount calculation
- **Rule OM-007:** Wish owners always see all offers (including hidden ones)
- **Rule OM-008:** Non-owners only see non-hidden offers

### **Validation Logic:**
```typescript
// Comprehensive offer validation
- Prevent self-offers: offer.user.id !== wish.owner.id
- Amount validation: offer.amount <= (wish.price - wish.raised)
- Transaction integrity: All offer operations wrapped in transactions
```

---

## Data Visibility and Access Rules

### **Wish Detail View Rules**
- **Rule DV-001:** Wish owners see complete data including:
  - All offers (hidden and visible)
  - Progress calculation: `(raised / price) * 100`
  - Complete participant list
  
- **Rule DV-002:** Non-owners see filtered data:
  - Only non-hidden offers
  - No progress calculations
  - Limited participant information

### **Authentication-Based Loading**
- **Rule DV-003:** Different relation loading based on authentication status:
  - Authenticated users: Load offers with user details
  - Anonymous users: Load basic wish data only

### **Implementation Pattern:**
```typescript
// From WishesService.findOneDetailed()
if (isOwner) {
  return {
    ...wish,
    progress: (wish.raised / wish.price) * 100,
    allParticipants: wish.offers.map((o) => o.user),
  };
} else {
  return {
    ...wish,
    offers: wish.offers.filter((offer) => !offer.hidden),
  };
}
```

---

## Collection and Aggregation Rules

### **Raised Amount Calculation**
- **Rule CA-001:** Wish `raised` amount is sum of all associated offers
- **Rule CA-002:** Raised amount updates automatically when offers are created
- **Rule CA-003:** Raised amount is rounded to 2 decimal places
- **Rule CA-004:** Raised amount cannot be manually modified

### **Search and Discovery Rules**
- **Rule SD-001:** Users can be searched by email, username, or about fields
- **Rule SD-002:** Search uses LIKE pattern matching with wildcards
- **Rule SD-003:** Last wishes: 40 most recent wishes, ordered by createdAt DESC
- **Rule SD-004:** Top wishes: 20 most copied wishes, ordered by copied DESC

### **Implementation Pattern:**
```typescript
// Multi-field search implementation
return this.userRepository.find({
  where: [
    { email: Like(`%${query}%`) },
    { username: Like(`%${query}%`) },
    { about: Like(`%${query}%`) },
  ],
});
```

---

## Security and Authorization Rules

### **Authentication Requirements**
- **Rule SA-001:** All modification operations require JWT authentication
- **Rule SA-002:** Some read operations support optional authentication
- **Rule SA-003:** Anonymous users can view wishes but not offers/participants

### **Authorization Patterns**
- **Rule SA-004:** Ownership verification required for all edit/delete operations
- **Rule SA-005:** Ownership checks throw `ForbiddenException` when failed
- **Rule SA-006:** Missing resource checks throw `NotFoundException`

### **Password and Security Rules**
- **Rule SA-007:** Passwords are hashed using bcrypt with salt rounds = 10
- **Rule SA-008:** Passwords are excluded from all serialization
- **Rule SA-009:** Password updates require re-hashing

---

## Data Transformation Rules

### **Monetary Value Handling**
- **Rule DT-001:** All monetary values (price, raised, amount) use pattern:
  ```typescript
  @Transform(({ value }) => Math.round(Number(value) * 100) / 100)
  ```
- **Rule DT-002:** Minimum values enforced: price ≥ 1, raised ≥ 0, amount ≥ 1
- **Rule DT-003:** All monetary operations maintain 2 decimal precision

### **Default Value Rules**
- **Rule DT-004:** New wishes: `copied: 0`, `raised: 0`
- **Rule DT-005:** New offers: `hidden: false`
- **Rule DT-006:** User avatar default: `https://i.pravatar.cc/300`
- **Rule DT-007:** User about default: `"Haven't told anything about myself yet"`

---

## Transaction and Consistency Rules

### **Atomicity Requirements**
- **Rule TC-001:** Wish copying operations must be atomic (transaction-wrapped)
- **Rule TC-002:** Offer creation must atomically update wish.raised amount
- **Rule TC-003:** Counter increments must be atomic to prevent race conditions

### **Consistency Validation**
- **Rule TC-004:** Before any update, validate current state (offers exist, ownership)
- **Rule TC-005:** All business rule violations throw appropriate HTTP exceptions
- **Rule TC-006:** Database constraints prevent orphaned records

---

## Error Handling Rules

### **Exception Patterns**
- **Rule EH-001:** Ownership violations → `ForbiddenException`
- **Rule EH-002:** Missing resources → `NotFoundException`
- **Rule EH-003:** Duplicate usernames → `BadRequestException`
- **Rule EH-004:** Invalid credentials → `UnauthorizedException`

### **Error Messages**
- **Rule EH-005:** All user-facing errors with proper localization
- **Rule EH-006:** Consistent error message format across all endpoints
- **Rule EH-007:** Security-sensitive errors use generic messages

---

## Performance and Optimization Rules

### **Relation Loading Optimization**
- **Rule PO-001:** Load relations only when needed based on use case
- **Rule PO-002:** Different relation sets for owners vs non-owners
- **Rule PO-003:** Eager loading patterns: `{ owner: true, offers: { user: true } }`

### **Query Optimization**
- **Rule PO-004:** Use `take` parameter for pagination (last: 40, top: 20)
- **Rule PO-005:** Implement appropriate indexes for search operations
- **Rule PO-006:** Cache frequently accessed data where appropriate

---

> **Note:** These business rules were extracted from comprehensive codebase analysis and represent the actual implemented behavior, not just the documented requirements. They form the foundation for understanding the system's true capabilities and constraints. 