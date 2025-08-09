# Step 6: Application Configuration

**Objective:** Generate app module setup, database configuration, and application bootstrap.

**Input Configuration:** Use `appConfigSpec`, `moduleSpecs`, and `validationRules` from `app-config-generation-config.ts` in this folder.

## Instructions

You are a senior NestJS developer. Generate the final application configuration to integrate all modules and services for the WishListShare platform.

### Requirements

1. **Configure AppModule** with all feature modules and dependencies
2. **Setup database connection** with TypeORM configuration
3. **Configure main.ts** with Swagger, CORS, and global pipes
4. **Update individual modules** to properly export/import dependencies
5. **Enable global validation** and error handling
6. **Configure environment variables** for different deployment stages

### Components to Generate/Update

**AppModule** (`src/app.module.ts`):
- Import all feature modules (Users, Wishes, Wishlists, Offers, Auth)
- Configure TypeORM with PostgreSQL connection
- Setup JWT and Passport modules
- Configure global settings

**Main Bootstrap** (`src/main.ts`):
- Application startup configuration
- Swagger documentation setup
- CORS enablement
- Global validation pipe configuration
- Port and prefix setup

**Individual Feature Modules**:
- Update imports/exports for proper dependency injection
- Ensure TypeORM repositories are properly configured
- Export services that other modules depend on

### Module Dependencies

**UsersModule**:
- Imports: TypeORM for User entity
- Exports: UsersService (needed by AuthModule)

**WishesModule**:
- Imports: TypeORM for Wish entity
- Exports: WishesService (needed by AuthModule guards)

**WishlistsModule**:
- Imports: TypeORM for Wishlist entity
- Exports: WishlistsService

**OffersModule**:
- Imports: TypeORM for Offer and Wish entities
- Exports: OffersService

**AuthModule**:
- Imports: UsersModule, PassportModule, JwtModule
- Provides: All authentication strategies and guards
- Exports: AuthService

### Database Configuration

**TypeORM Setup**:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nest_project',
  username: 'student',
  password: 'student',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Development only
  logging: false
})
```

**Entity Registration**:
Each module should use `TypeOrmModule.forFeature([Entity])` to register its entities.

### Application Bootstrap Configuration

**Global Pipes**:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true
}));
```

**CORS Setup**:
```typescript
app.enableCors();
```

**Swagger Configuration**:
```typescript
const config = new DocumentBuilder()
  .setTitle('WishListShare API')
  .setDescription('Gift sharing platform with collective funding')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

### Environment Configuration

**Required Environment Variables**:
- `DATABASE_HOST`: Database host (default: localhost)
- `DATABASE_PORT`: Database port (default: 5432)
- `DATABASE_NAME`: Database name (default: nest_project)
- `DATABASE_USER`: Database user (default: student)
- `DATABASE_PASSWORD`: Database password (default: student)
- `JWT_SECRET`: JWT signing secret (default: yourSecretKey)
- `PORT`: Application port (default: 3000)

### File Structure Updates

```
src/
├── app.module.ts (updated)
├── main.ts (updated)
├── users/users.module.ts (updated)
├── wishes/wishes.module.ts (updated)
├── wishlists/wishlists.module.ts (updated)
├── offers/offers.module.ts (updated)
└── auth/auth.module.ts (updated)
```

### Validation Commands

After generation, verify complete system integration:
```bash
# Build and start
npm run build
npm run start:dev

# Verify all endpoints accessible
curl http://localhost:3000/api  # Swagger documentation

# Test basic functionality
curl http://localhost:3000/wishes/last
curl http://localhost:3000/users

# Test authentication flow
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Test protected endpoints with token
curl -X POST http://localhost:3000/wishes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Wish","link":"https://example.com","image":"https://example.com/img.jpg","price":25.99,"description":"Test description"}'
```

### Success Criteria

- Application starts without compilation errors
- All modules properly integrated and dependencies resolved
- Database connection established and entities synchronized
- Swagger documentation accessible at `/api` with all endpoints
- Authentication flow functional (signup → login → protected routes)
- Global validation working on all endpoints
- CORS enabled for frontend integration
- All business rules enforced through the complete request flow

### Final Integration Test

The system should support the complete user journey:
1. User registration via `/auth/signup`
2. User login via `/auth/login` 
3. Creating wishes via `/wishes`
4. Copying wishes via `/wishes/:id/copy`
5. Creating offers via `/offers`
6. Managing wishlists via `/wishlists`
7. Profile management via `/users/me`

All with proper authentication, authorization, and business rule enforcement. 