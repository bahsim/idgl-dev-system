// Authentication Business Rules
// Rules for authentication, authorization, and security

import { BusinessRuleSpec } from './types';

export const authBusinessRules: BusinessRuleSpec[] = [
  {
    id: "AUTH-001",
    description: "Username and password must be valid for authentication",
    implementation: "Find user by username and compare password hash",
    errorType: "UnauthorizedException",
    errorMessage: "Invalid credentials"
  },
  {
    id: "AUTH-002", 
    description: "Only authenticated users can receive JWT tokens",
    implementation: "Generate JWT with user ID and username in payload",
    errorType: "UnauthorizedException",
    errorMessage: "Authentication required"
  },
  {
    id: "AUTH-003",
    description: "New user registration must have unique username and email",
    implementation: "Hash password and create user with unique constraints",
    errorType: "BadRequestException",
    errorMessage: "Username or email already exists"
  }
]; 