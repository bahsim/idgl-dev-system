// Module Specifications - Feature Module Configurations
// Defines imports, controllers, providers, and exports for each feature module

import type { ModuleSpec } from '../types';

export const moduleSpecs: ModuleSpec[] = [
  {
    name: "UsersModule",
    path: "src/users/users.module.ts",
    imports: ["TypeOrmModule.forFeature([User])"],
    controllers: ["UsersController"],
    providers: ["UsersService"],
    exports: ["UsersService"]
  },
  {
    name: "WishesModule", 
    path: "src/wishes/wishes.module.ts",
    imports: ["TypeOrmModule.forFeature([Wish])"],
    controllers: ["WishesController"],
    providers: ["WishesService"],
    exports: ["WishesService"]
  },
  {
    name: "WishlistsModule",
    path: "src/wishlists/wishlists.module.ts", 
    imports: ["TypeOrmModule.forFeature([Wishlist])"],
    controllers: ["WishlistsController"],
    providers: ["WishlistsService"],
    exports: ["WishlistsService"]
  },
  {
    name: "OffersModule",
    path: "src/offers/offers.module.ts",
    imports: ["TypeOrmModule.forFeature([Offer, Wish])"],
    controllers: ["OffersController"],
    providers: ["OffersService"],
    exports: ["OffersService"]
  },
  {
    name: "AuthModule",
    path: "src/auth/auth.module.ts", 
    imports: [
      "UsersModule",
      "PassportModule",
      "JwtModule.register({ secret: 'yourSecretKey', signOptions: { expiresIn: '1d' } })"
    ],
    controllers: ["AuthController"],
    providers: [
      "AuthService",
      "LocalStrategy", 
      "JwtStrategy",
      "JwtAuthGuard",
      "LocalAuthGuard",
      "OptionalJwtAuthGuard",
      "WishOwnerGuard"
    ],
    exports: ["AuthService"]
  }
]; 