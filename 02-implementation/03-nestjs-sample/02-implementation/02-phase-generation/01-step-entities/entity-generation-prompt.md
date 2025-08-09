# Step 1: Entity Generation

**Objective:** Generate complete TypeORM entities with decorators, relationships, and validation.

**Input Configuration:** Use `entitySpecs` from `entity-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate TypeORM entities for the WishListShare platform using the specifications provided.

### Requirements

1. **Create entities for:** User, Wish, Wishlist, Offer
2. **Use proper TypeORM decorators:** @Entity, @Column, @PrimaryGeneratedColumn, etc.
3. **Implement all relationships:** OneToMany, ManyToOne, ManyToMany with proper mappings
4. **Add validation decorators:** Use class-validator decorators as specified
5. **Include timestamps:** CreateDateColumn, UpdateDateColumn for all entities
6. **Follow exact field specifications:** Use provided constraints and defaults

### Entity Specifications

**User Entity:**
- username: unique, 2-30 characters
- about: 200 characters, optional with default
- avatar: URL with default
- email: unique, validated format
- password: minimum 8 characters for validation

**Wish Entity:**
- name: 1-250 characters
- link: validated URL format
- image: validated URL format  
- price: decimal(10,2) with transform
- raised: decimal(10,2) with default 0
- description: text field, 1-1024 characters
- copied: integer with default 0

**Wishlist Entity:**
- name: 1-250 characters
- description: optional text, 1-1500 characters
- image: validated URL format

**Offer Entity:**
- amount: decimal(10,2) with transform
- hidden: boolean with default false
- message: optional, 1-200 characters

### File Structure

Create files in the existing project structure:
```
src/users/entities/user.entity.ts
src/wishes/entities/wish.entity.ts
src/wishlists/entities/wishlist.entity.ts
src/offers/entities/offer.entity.ts
```

### Validation Commands

After generation, verify:
```bash
npm run build  # Must compile without errors
```

### Success Criteria

- All entities compile without TypeScript errors
- Proper TypeORM decorators applied
- Relationships correctly mapped
- Validation decorators match specifications
- Timestamps included on all entities 