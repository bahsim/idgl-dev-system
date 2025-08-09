# Step 5: Controller Generation

**Objective:** Generate REST API controllers with proper guards, validation, and Swagger documentation.

**Input Configuration:** Use `controllerSpecs` from `controllers-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate API controllers for the WishListShare platform using the specifications provided.

### Requirements

1. **Create controller classes** with @Controller decorator
2. **Implement REST endpoints** (GET, POST, PATCH, DELETE)
3. **Use appropriate guards** (JwtAuthGuard, WishOwnerGuard, OptionalJwtAuthGuard)
4. **Add Swagger documentation** (@ApiTags, @ApiOperation, @ApiResponse)
5. **Implement proper HTTP status codes** for all responses
6. **Extract user from request object** for authenticated endpoints
7. **Use proper DTOs** for request/response validation

### Controller Endpoints by Entity

**UsersController** (`/users`):
- `GET /` - Get all users (public)
- `GET /me` - Get current user profile (authenticated)
- `GET /:id` - Get user by ID (public)
- `PATCH /:id` - Update user profile (authenticated, self-only)

**WishesController** (`/wishes`):
- `GET /` - Get all wishes (optional auth for enhanced data)
- `GET /last` - Get recent wishes (public)
- `GET /top` - Get top funded wishes (public)
- `GET /:id` - Get wish by ID (public)
- `POST /` - Create new wish (authenticated)
- `POST /:id/copy` - Copy wish (authenticated)
- `PATCH /:id` - Update wish (authenticated, owner-only)
- `DELETE /:id` - Delete wish (authenticated, owner-only)

**WishlistsController** (`/wishlists`):
- `GET /` - Get all wishlists (public)
- `GET /:id` - Get wishlist by ID (public)
- `POST /` - Create new wishlist (authenticated)
- `PATCH /:id` - Update wishlist (authenticated, owner-only)
- `DELETE /:id` - Delete wishlist (authenticated, owner-only)

**OffersController** (`/offers`):
- `GET /` - Get all offers (public)
- `GET /:id` - Get offer by ID (public)
- `POST /` - Create new offer (authenticated)
- `PATCH /:id` - Update offer (authenticated, owner-only)
- `DELETE /:id` - Delete offer (authenticated, owner-only)

### Guard Usage Patterns

**No Guards** (Public endpoints):
- Basic data retrieval that doesn't require authentication
- Discovery endpoints like `/wishes/last`, `/wishes/top`

**OptionalJwtAuthGuard**:
- Endpoints that provide enhanced data for authenticated users
- Example: `GET /wishes` shows additional data if user is authenticated

**JwtAuthGuard**:
- Standard authentication required
- All POST, PATCH, DELETE operations
- Profile access endpoints

**WishOwnerGuard** (Custom guard):
- Applied to wish modification endpoints
- Verifies current user owns the wish being modified
- Used with `PATCH /wishes/:id` and `DELETE /wishes/:id`

### Request Parameter Extraction

**Path Parameters:**
```typescript
@Param('id', ParseIntPipe) id: number
```

**User from Request:**
```typescript
@Req() req: Request
const currentUser = req.user as User;
```

**Request Body:**
```typescript
@Body() createDto: CreateEntityDto
@Body(ValidationPipe) updateDto: UpdateEntityDto
```

### Swagger Documentation Requirements

**Controller Level:**
```typescript
@ApiTags('entity-name')
@Controller('route-path')
```

**Endpoint Level:**
```typescript
@ApiOperation({ summary: 'Operation description' })
@ApiResponse({ status: 200, description: 'Success description' })
@ApiResponse({ status: 404, description: 'Not found' })
@ApiBearerAuth() // For authenticated endpoints
```

### Error Handling

Controllers should let service layer handle business logic and errors:
- **NotFoundException**: When entity not found by ID
- **ForbiddenException**: When user lacks permission
- **BadRequestException**: When business rules violated

### File Structure

Create files in the existing project structure:
```
src/users/users.controller.ts
src/wishes/wishes.controller.ts
src/wishlists/wishlists.controller.ts
src/offers/offers.controller.ts
```

### Validation Commands

After generation, verify:
```bash
npm run build  # Must compile without errors
npm run start:dev  # Should start without errors

# Check Swagger documentation
curl http://localhost:3000/api  # Should show all endpoints

# Test public endpoints
curl http://localhost:3000/wishes/last
curl http://localhost:3000/users

# Test authenticated endpoints (with token)
curl -X POST http://localhost:3000/wishes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","link":"https://example.com","image":"https://example.com/img.jpg","price":25.99,"description":"Test wish"}'
```

### Success Criteria

- All controllers compile without TypeScript errors
- All endpoints accessible via Swagger UI with proper documentation
- Guards properly applied to protect sensitive operations
- Proper HTTP status codes returned for all scenarios
- Request validation working through DTOs
- User extraction from JWT tokens functional 