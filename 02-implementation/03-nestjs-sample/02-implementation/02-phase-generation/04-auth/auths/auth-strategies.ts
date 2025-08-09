// Authentication Strategy Configuration
// Passport.js strategies for local and JWT authentication

import { StrategySpec } from '../types';

export const authStrategies: StrategySpec[] = [
  {
    name: "LocalStrategy",
    type: "local",
    description: "Validates username and password for login",
    filename: "local.strategy.ts",
    validation: "Verify username exists and password matches hashed password",
    dependencies: ["PassportStrategy", "Strategy", "AuthService"]
  },
  {
    name: "JwtStrategy",
    type: "jwt",
    description: "Validates JWT tokens and extracts user information",
    filename: "jwt.strategy.ts",
    validation: "Extract user from JWT payload and verify user exists",
    dependencies: ["PassportStrategy", "ExtractJwt", "Strategy", "UsersService"]
  }
]; 