# Step 4: Authentication System Generation

**Objective:** Generate complete JWT authentication system with strategies, guards, and auth service.

**Input Configuration:** Use `authConfig` and `businessRules` from `auth-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate a complete authentication system for the WishListShare platform using the specifications provided.

### Requirements

1. **Create AuthService** with login, signup, and user validation
2. **Implement JWT and Local strategies** for Passport
3. **Create custom guards** including WishOwnerGuard and OptionalJwtAuthGuard
4. **Use bcrypt** for password hashing with salt rounds
5. **Implement proper error handling** for authentication failures
6. **Add AuthController** with login and signup endpoints

### Components to Generate

**AuthService** (`src/auth/auth.service.ts`):
- `validateUser(username, password)`: Validate credentials for local strategy
- `login(user)`: Generate JWT token for authenticated user
- `signup(createUserDto)`: Register new user with password hashing
- `hashPassword(password)`: Hash password using bcrypt
- `comparePasswords(password, hashedPassword)`: Compare passwords

**Strategies:**
- **LocalStrategy** (`src/auth/strategies/local.strategy.ts`): Username/password validation
- **JwtStrategy** (`src/auth/strategies/jwt.strategy.ts`): JWT token validation and user extraction

**Guards:**
- **LocalAuthGuard** (`src/auth/guards/local-auth.guard.ts`): Local authentication guard
- **JwtAuthGuard** (`src/auth/guards/jwt-auth.guard.ts`): Standard JWT authentication
- **OptionalJwtAuthGuard** (`src/auth/guards/optional-jwt-auth.guard.ts`): Optional JWT for public endpoints
- **WishOwnerGuard** (`src/auth/guards/wish-owner.guard.ts`): Custom ownership validation

**AuthController** (`src/auth/auth.controller.ts`):
- `POST /auth/login`: User login endpoint
- `POST /auth/signup`: User registration endpoint  
- `GET /auth/profile`: Get current user profile

### Authentication Configuration

**JWT Settings:**
- Secret: Use environment variable or default "yourSecretKey"
- Expires: 1 day (1d)
- Algorithm: HS256

**Bcrypt Settings:**
- Salt rounds: 10

### Business Rules Implementation

**AUTH-001**: Username and password validation
- Find user by username using UsersService
- Compare provided password with stored hash
- Return user if valid, null if invalid

**AUTH-002**: JWT token generation
- Include user ID and username in payload
- Sign with configured secret and expiration
- Return access_token object

**AUTH-003**: User registration
- Hash password before saving
- Handle unique constraint violations for username/email
- Return created user (excluding password)

### Guard Implementation Details

**OptionalJwtAuthGuard:**
```typescript
// Override handleRequest to allow null user
handleRequest(err, user) {
  return user; // Allow null user for public endpoints
}
```

**WishOwnerGuard:**
```typescript
// Check if current user owns the wish
async canActivate(context: ExecutionContext): Promise<boolean> {
  // Extract wish ID from params
  // Get current user from request
  // Verify ownership through WishesService
}
```

### Error Handling

- **UnauthorizedException**: Invalid credentials or authentication required
- **BadRequestException**: Registration validation errors
- **ForbiddenException**: Access denied (used in custom guards)

### File Structure

```
src/auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
├── strategies/
│   ├── local.strategy.ts
│   └── jwt.strategy.ts
└── guards/
    ├── local-auth.guard.ts
    ├── jwt-auth.guard.ts
    ├── optional-jwt-auth.guard.ts
    └── wish-owner.guard.ts
```

### Validation Commands

After generation, verify:
```bash
npm run build  # Must compile without errors
npm run start:dev  # Should start without errors

# Test authentication endpoints
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"testpass123"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"testpass123"}'
```

### Success Criteria

- All authentication components compile without errors
- JWT strategy properly validates tokens and extracts users
- Local strategy validates username/password correctly
- Custom guards enforce business rules appropriately
- Authentication flow works end-to-end (signup → login → protected routes) 