// Authentication Controller Configuration
// REST endpoints for authentication operations

import { AuthControllerSpec } from '../types';

export const authControllerSpec: AuthControllerSpec = {
  endpoints: [
    {
      method: "POST",
      path: "/auth/login",
      description: "User login with username and password",
      guards: ["LocalAuthGuard"],
      parameters: [
        { name: "req", type: "Request", required: true, description: "Request object with user" }
      ],
      returnType: "Promise<{ access_token: string }>"
    },
    {
      method: "POST",
      path: "/auth/signup",
      description: "User registration",
      guards: [],
      parameters: [
        { name: "createUserDto", type: "CreateUserDto", required: true, description: "User registration data" }
      ],
      returnType: "Promise<User>"
    },
    {
      method: "GET",
      path: "/auth/profile",
      description: "Get current user profile",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", required: true, description: "Request object with user" }
      ],
      returnType: "User"
    }
  ],
  dependencies: ["AuthService"]
}; 