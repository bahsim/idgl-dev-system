# Advanced Implementation Patterns

This document captures the sophisticated implementation patterns and technical details discovered through comprehensive codebase analysis. These patterns represent advanced NestJS, TypeORM, and Node.js implementation techniques that were missing from initial concept documentation.

---

## Data Transformation Patterns

### **Monetary Value Precision Pattern**
All monetary values use a sophisticated rounding pattern to ensure consistent precision:

```typescript
@Transform(({ value }) => Math.round(Number(value) * 100) / 100)
```

**Implementation Details:**
- **Purpose:** Ensures exactly 2 decimal places for all monetary operations
- **Usage:** Applied to `price`, `raised`, and `amount` fields
- **Mathematical Precision:** Prevents floating-point precision errors
- **Business Logic:** Maintains sub-unit precision for currency handling

**Applied To:**
- `Wish.price` - Item cost
- `Wish.raised` - Amount collected
- `Offer.amount` - Contribution amount

### **Value Validation with Transformation**
Combined validation and transformation pattern:

```typescript
@Min(1)
@Transform(({ value }) => Math.round(Number(value) * 100) / 100)
price: number;

@Min(0)
@Transform(({ value }) => Math.round(Number(value) * 100) / 100)
raised: number;
```

**Pattern Benefits:**
- **Validation First:** Ensures minimum value constraints
- **Transformation Second:** Normalizes precision
- **Type Safety:** Maintains TypeScript number typing
- **Consistency:** Same pattern across all monetary fields

---

## Security and Privacy Patterns

### **Password Exclusion Pattern**
Sophisticated password handling with serialization exclusion:

```typescript
@Column({ nullable: false })
@Exclude()
password: string;
```

**Security Features:**
- **Serialization Protection:** Never included in JSON responses
- **Class-transformer Integration:** Uses `@Exclude()` decorator
- **Database Storage:** Stored as bcrypt hash
- **Update Handling:** Re-hashed on password changes

### **Conditional Password Hashing**
Dynamic password hashing only when password is provided:

```typescript
const dto = {
  ...updateUserDto,
  ...(updateUserDto.password && {
    password: await bcrypt.hash(updateUserDto.password, 10),
  }),
};
```

**Pattern Benefits:**
- **Conditional Logic:** Only hashes when password is being updated
- **Spread Operator:** Cleanly merges hashed password
- **Salt Rounds:** Uses 10 salt rounds for security
- **No Unnecessary Hashing:** Avoids hashing undefined values

---

## Dynamic Relation Loading Patterns

### **Authentication-Based Relation Loading**
Dynamic relation loading based on authentication status:

```typescript
private getRelations(includeOffers: boolean) {
  return includeOffers
    ? { owner: true, offers: { user: true } }
    : { owner: true };
}

findLast(isAuth: boolean) {
  return this.wishRepository.find({
    relations: this.getRelations(isAuth),
  });
}
```

**Implementation Benefits:**
- **Performance Optimization:** Only loads needed relations
- **Privacy Protection:** Prevents unauthorized data access
- **Flexible Querying:** Same method, different data based on context
- **Nested Relations:** Supports complex relation hierarchies

### **Owner-Based Data Filtering**
Context-aware data filtering based on ownership:

```typescript
async findOneDetailed(wishId: number, userId?: number) {
  const wish = await this.findOne({
    where: { id: wishId },
    relations: ['owner', 'offers', 'offers.user'],
  });

  const isOwner = userId && wish.owner.id === userId;

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
}
```

**Advanced Features:**
- **Ownership Detection:** Dynamic user role detection
- **Data Augmentation:** Adds computed fields for owners
- **Privacy Filtering:** Filters sensitive data for non-owners
- **Nested Object Manipulation:** Complex data transformations

---

## Transaction Management Patterns

### **Atomic Copy Operation**
Complex transactional operation with multiple database operations:

```typescript
async copyWish(wishId: number, user: User) {
  return this.wishRepository.manager.transaction(
    async (manager: EntityManager) => {
      const wish = await manager.findOne(Wish, {
        where: { id: wishId },
      });

      if (!wish) {
        throw new NotFoundException('Wish not found');
      }

      const newWish = manager.create(Wish, {
        ...wish,
        id: undefined,
        owner: user,
        copied: 0,
        raised: 0,
        createdAt: undefined,
        updatedAt: undefined,
        offers: [],
      });

      await manager.save(newWish);

      await manager.update(Wish, wishId, {
        copied: (wish.copied || 0) + 1,
      });

      return newWish;
    },
  );
}
```

**Transaction Features:**
- **Atomicity:** All operations succeed or fail together
- **Entity Manager:** Uses transaction-scoped entity manager
- **Field Reset:** Carefully resets specific fields for new entity
- **Counter Increment:** Atomically increments copy counter
- **Error Handling:** Proper exception handling within transaction

### **Business Rule Validation Pattern**
Complex validation with multiple checks before operations:

```typescript
async updateWishByOwner(
  id: number,
  updateWishDto: UpdateWishDto,
  ownerId: number,
) {
  const wish = await this.findOne({
    where: { id },
    relations: ['owner', 'offers'],
  });

  if (!wish) {
    throw new NotFoundException('Wish not found');
  }

  if (wish.offers.length > 0) {
    throw new ForbiddenException();
  }

  if (wish.owner.id !== ownerId) {
    throw new ForbiddenException();
  }

  return this.wishRepository.update(id, updateWishDto);
}
```

**Validation Pattern:**
- **Existence Check:** Verify entity exists
- **Business Rules:** Check offers constraint
- **Authorization:** Verify ownership
- **Appropriate Exceptions:** Different exceptions for different scenarios

---

## Advanced Query Patterns

### **Multi-Field Search Pattern**
Complex search across multiple fields with LIKE operations:

```typescript
findAll(query: string) {
  return this.userRepository.find({
    where: [
      { email: Like(`%${query}%`) },
      { username: Like(`%${query}%`) },
      { about: Like(`%${query}%`) },
    ],
  });
}
```

**Query Features:**
- **Multiple Fields:** Searches across different entity fields
- **Wildcard Matching:** Uses SQL LIKE with wildcards
- **OR Logic:** Any field matching returns result
- **Flexible Input:** Single query parameter searches multiple fields

### **Ordering and Pagination Pattern**
Sophisticated ordering with take limits for different use cases:

```typescript
findLast(isAuth: boolean) {
  return this.wishRepository.find({
    order: { createdAt: 'DESC' },
    take: 40,
    relations: this.getRelations(isAuth),
  });
}

findTop(isAuth: boolean) {
  return this.wishRepository.find({
    order: { copied: 'DESC' },
    take: 20,
    relations: this.getRelations(isAuth),
  });
}
```

**Pattern Benefits:**
- **Different Ordering:** Different sort criteria for different endpoints
- **Pagination Control:** Fixed take limits for performance
- **Combined Patterns:** Integrates with relation loading pattern
- **Business Logic:** Reflects "last" vs "top" business concepts

---

## Error Handling Patterns

### **Contextual Exception Throwing**
Different exceptions based on specific business contexts:

```typescript
// Ownership validation
if (wish.owner.id !== ownerId) {
  throw new ForbiddenException();
}

// Business rule validation
if (wish.offers.length > 0) {
  throw new ForbiddenException();
}

// Existence validation
if (!wish) {
  throw new NotFoundException('Wish not found');
}

// Authentication validation
throw new UnauthorizedException('Invalid username or password');

// Validation errors
throw new BadRequestException('Error creating user');
```

**Exception Strategy:**
- **Specific Exceptions:** Different HTTP status codes for different scenarios
- **Localized Messages:** Localized error messages for user-facing errors
- **Consistent Patterns:** Same exception types for same error categories
- **Security Considerations:** Generic messages for security-sensitive errors

### **Defensive Programming Pattern**
Null-safe operations with fallback values:

```typescript
copied: (wish.copied || 0) + 1
```

**Safety Features:**
- **Null Coalescing:** Handles undefined/null values
- **Default Values:** Provides sensible defaults
- **Type Safety:** Ensures numeric operations
- **Robust Operations:** Prevents runtime errors

---

## Service Integration Patterns

### **Service Composition Pattern**
Services calling other services for complex operations:

```typescript
// AuthService using UsersService
constructor(
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
) {}

async signup(createUserDto: CreateUserDto) {
  const user = await this.usersService.findOneByUsername(
    createUserDto.username,
  );
  // ... rest of logic
}
```

**Composition Benefits:**
- **Single Responsibility:** Each service has focused responsibilities
- **Reusability:** Services can be reused across different contexts
- **Testability:** Easier to unit test individual services
- **Modularity:** Clear separation of concerns

### **Configuration Injection Pattern**
Dynamic configuration usage in services:

```typescript
return {
  access_token: this.jwtService.sign(payload, {
    secret: configuration().jwt.secret,
  }),
};
```

**Configuration Features:**
- **Dynamic Configuration:** Runtime configuration access
- **Environment Separation:** Different configs for different environments
- **Security:** Sensitive values from configuration, not hardcoded
- **Flexibility:** Easy to change configuration without code changes

---

## TypeORM Advanced Patterns

### **Entity Creation with Overrides**
Sophisticated entity creation with field overrides:

```typescript
const wish = this.wishRepository.create({
  ...createWishDto,
  owner,
  copied: 0,
  raised: 0,
});
```

**Creation Pattern:**
- **DTO Spreading:** Spreads input data
- **Override Fields:** Overrides specific fields with business logic
- **Default Values:** Sets appropriate defaults
- **Relationship Assignment:** Assigns entity relationships

### **Complex Relation Queries**
Multi-level relation loading for complex data needs:

```typescript
const wish = await this.findOne({
  where: { id: wishId },
  relations: ['owner', 'offers', 'offers.user'],
});
```

**Relation Features:**
- **Nested Relations:** Loads relations of relations (`offers.user`)
- **Selective Loading:** Only loads needed relations
- **Performance Optimization:** Avoids N+1 query problems
- **Data Completeness:** Provides complete data in single query

---

> **Note:** These implementation patterns represent sophisticated backend development techniques that emerge from real-world application requirements. They demonstrate advanced NestJS, TypeORM, and Node.js patterns that go beyond basic CRUD operations to handle complex business logic, security, and performance requirements. 