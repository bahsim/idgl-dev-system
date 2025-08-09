// Authentication Guard Configuration
// Guards for protecting endpoints and verifying permissions

import { GuardSpec } from '../types';

export const authGuards: GuardSpec[] = [
  {
    name: "LocalAuthGuard",
    description: "Guard for local username/password authentication",
    filename: "local-auth.guard.ts",
    extends: "AuthGuard('local')",
    dependencies: ["AuthGuard"]
  },
  {
    name: "JwtAuthGuard",
    description: "Guard for JWT token authentication",
    filename: "jwt-auth.guard.ts",
    extends: "AuthGuard('jwt')",
    dependencies: ["AuthGuard"]
  },
  {
    name: "OptionalJwtAuthGuard",
    description: "Optional JWT guard that allows both authenticated and anonymous access",
    filename: "optional-jwt-auth.guard.ts",
    extends: "AuthGuard('jwt')",
    customLogic: "Override handleRequest to allow null user",
    dependencies: ["AuthGuard"]
  },
  {
    name: "WishOwnerGuard",
    description: "Custom guard to verify wish ownership",
    filename: "wish-owner.guard.ts",
    extends: "CanActivate",
    customLogic: "Check if current user owns the wish",
    dependencies: ["CanActivate", "WishesService"]
  }
]; 