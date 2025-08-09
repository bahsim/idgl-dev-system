# Step 3: Service Generation

**Objective:** Generate service classes with CRUD operations and business rule enforcement.

**Input Configuration:** Use `serviceSpecs` from `services-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate business logic services for the WishListShare platform using the specifications provided.

### Requirements

1. **Create service classes** with @Injectable decorator
2. **Implement CRUD operations** (findAll, findOne, create, update, remove)
3. **Enforce all business rules** specified in the configuration
4. **Use proper error handling** (NotFoundException, ForbiddenException, BadRequestException)
5. **Implement user permission checks** for ownership validation
6. **Use TypeORM repositories** with @InjectRepository
7. **Add proper TypeScript typing** for all methods

### Critical Business Rules to Implement

**User Rules:**
- UR-001: Username must be unique across the platform
- UR-002: Email must be unique across the platform  
- UR-003: Users can only update their own profile

**Wish Rules:**
- WR-001: All wishes must have an owner
- WR-002: Users can only edit their own wishes
- WR-003: Users can only delete their own wishes
- WR-005: Any authenticated user can copy any wish
- WR-007: Copying increments original wish's copied counter atomically

**Wishlist Rules:**
- WLR-001: All wishlists must have an owner
- WLR-002: Users can only edit their own wishlists
- WLR-003: Users can only delete their own wishlists

**Offer Rules:**
- OR-001: Users cannot create offers on their own wishes
- OR-002: Offer amount cannot exceed remaining needed amount
- OR-003: Users can only edit their own offers
- OR-004: Users can only delete their own offers

### Service Method Patterns

**Standard CRUD Pattern:**
```typescript
async findAll(): Promise<Entity[]>
async findOne(id: number): Promise<Entity>
async create(dto: CreateDto, currentUser: User): Promise<Entity>
async update(id: number, dto: UpdateDto, currentUser: User): Promise<Entity>
async remove(id: number, currentUser: User): Promise<void>
```

**Special Methods:**
- `WishesService.copy()`: Copy wish and increment counter
- `WishesService.findLast()`: Get recent wishes
- `WishesService.findTop()`: Get highest funded wishes
- `UsersService.findByUsername()`: Find user for authentication

### Error Handling Requirements

- **NotFoundException**: When entity not found by ID
- **ForbiddenException**: When user lacks permission for operation
- **BadRequestException**: When business rules violated or data invalid

### Dependencies

**UsersService:** Repository<User>, bcrypt
**WishesService:** Repository<Wish>, QueryRunner  
**WishlistsService:** Repository<Wishlist>
**OffersService:** Repository<Offer>, Repository<Wish>, QueryRunner

### File Structure

Create files in the existing project structure:
```
src/users/users.service.ts
src/wishes/wishes.service.ts
src/wishlists/wishlists.service.ts
src/offers/offers.service.ts
```

### Validation Commands

After generation, verify:
```bash
npm run build  # Must compile without errors
npm run lint   # Should pass validation
npm run start:dev  # Should start without errors
```

### Success Criteria

- All services compile without TypeScript errors
- Business rules properly enforced with appropriate error types
- CRUD operations functional with permission checks
- Proper dependency injection implemented
- Error handling returns appropriate HTTP status codes 