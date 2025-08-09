// Authentication Service Configuration
// Auth service methods for login, signup, and password management

import { AuthServiceSpec } from '../types';

export const authServiceSpec: AuthServiceSpec = {
  methods: [
    {
      name: "validateUser",
      description: "Validate user credentials for local strategy",
      parameters: [
        { name: "username", type: "string", required: true, description: "Username to validate" },
        { name: "password", type: "string", required: true, description: "Password to validate" }
      ],
      returnType: "Promise<User | null>",
      businessRules: ["AUTH-001"]
    },
    {
      name: "login",
      description: "Generate JWT token for authenticated user",
      parameters: [
        { name: "user", type: "User", required: true, description: "Authenticated user" }
      ],
      returnType: "Promise<{ access_token: string }>",
      businessRules: ["AUTH-002"]
    },
    {
      name: "signup",
      description: "Register new user with password hashing",
      parameters: [
        { name: "createUserDto", type: "CreateUserDto", required: true, description: "User registration data" }
      ],
      returnType: "Promise<User>",
      businessRules: ["AUTH-003"]
    },
    {
      name: "hashPassword",
      description: "Hash password using bcrypt",
      parameters: [
        { name: "password", type: "string", required: true, description: "Plain text password" }
      ],
      returnType: "Promise<string>",
      businessRules: []
    },
    {
      name: "comparePasswords",
      description: "Compare plain password with hashed password",
      parameters: [
        { name: "password", type: "string", required: true, description: "Plain text password" },
        { name: "hashedPassword", type: "string", required: true, description: "Hashed password" }
      ],
      returnType: "Promise<boolean>",
      businessRules: []
    }
  ],
  dependencies: ["UsersService", "JwtService", "bcrypt"]
}; 