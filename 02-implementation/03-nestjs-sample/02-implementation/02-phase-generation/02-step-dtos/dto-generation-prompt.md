# Step 2: DTO Generation

**Objective:** Generate Data Transfer Objects for all API endpoints with complete validation.

**Input Configuration:** Use individual DTO specs from `dto-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate DTOs for the WishListShare platform API endpoints using the specifications provided.

### Requirements

1. **Create CreateDto and UpdateDto** for each entity (User, Wish, Wishlist, Offer)
2. **Use class-validator decorators** for validation as specified
3. **Add Swagger/OpenAPI decorators** (@ApiProperty) with descriptions and examples
4. **Exclude 'id' field** from Create DTOs (auto-generated)
5. **Make all fields optional** in Update DTOs except where validation requires otherwise
6. **Use proper TypeScript types** matching entity specifications
7. **Add meaningful validation messages** for better API usability

### Create DTO Specifications

**CreateUserDto:**
- username: required, 2-30 characters
- about: optional, 2-200 characters  
- avatar: optional, valid URL
- email: required, valid email format
- password: required, minimum 8 characters

**CreateWishDto:**
- name: required, 1-250 characters
- link: required, valid URL
- image: required, valid URL
- price: required, positive number with max 2 decimals
- description: required, 1-1024 characters

**CreateWishlistDto:**
- name: required, 1-250 characters
- description: optional, 1-1500 characters
- image: required, valid URL

**CreateOfferDto:**
- itemId: required, number (wish ID)
- amount: required, positive number with max 2 decimals
- hidden: optional, boolean
- message: optional, 1-200 characters

### Update DTO Specifications

**UpdateUserDto:**
- username: optional, 2-30 characters (if provided)
- about: optional, 2-200 characters (if provided)
- avatar: optional, valid URL (if provided)
- email: optional, valid email format (if provided)
- password: excluded (use separate password change endpoint)

**UpdateWishDto:**
- name: optional, 1-250 characters (if provided)
- link: optional, valid URL (if provided)
- image: optional, valid URL (if provided)
- price: optional, positive number with max 2 decimals (if provided)
- description: optional, 1-1024 characters (if provided)

**UpdateWishlistDto:**
- name: optional, 1-250 characters (if provided)
- description: optional, 1-1500 characters (if provided)
- image: optional, valid URL (if provided)

**UpdateOfferDto:**
- amount: optional, positive number with max 2 decimals (if provided)
- hidden: optional, boolean (if provided)
- message: optional, 1-200 characters (if provided)
- itemId: excluded (cannot change target wish)

### File Structure

Create files in the existing project structure:
```
src/users/dto/create-user.dto.ts
src/users/dto/update-user.dto.ts
src/wishes/dto/create-wish.dto.ts
src/wishes/dto/update-wish.dto.ts
src/wishlists/dto/create-wishlist.dto.ts
src/wishlists/dto/update-wishlist.dto.ts
src/offers/dto/create-offer.dto.ts
src/offers/dto/update-offer.dto.ts
```

### Validation Commands

After generation, verify:
```bash
npm run build  # Must compile without errors
npm run lint   # Should pass validation
```

### Success Criteria

- All DTOs compile without TypeScript errors
- Validation decorators properly applied
- Swagger documentation includes descriptions and examples
- Create DTOs exclude auto-generated fields
- Update DTOs make all fields optional with proper validation 