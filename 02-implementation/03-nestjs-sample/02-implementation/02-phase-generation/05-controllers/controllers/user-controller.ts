// User Controller Configuration
// User management endpoints with authentication and profile operations

import { ControllerSpec } from '../types';

export const userControllerSpec: ControllerSpec = {
  entityName: "User",
  controllerName: "UsersController",
  routePath: "users",
  description: "User management endpoints",
  endpoints: [
    {
      method: "GET",
      path: "",
      functionName: "findAll",
      description: "Get all users with basic public information",
      guards: [],
      parameters: [],
      responses: [
        { status: 200, description: "List of users", type: "User[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get all users" } },
        { decorator: "ApiResponse", params: { status: 200, description: "List of users", type: "[User]" } }
      ]
    },
    {
      method: "GET",
      path: ":id",
      functionName: "findOne",
      description: "Get single user by ID",
      guards: [],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "User ID", validation: ["ParseIntPipe"] }
      ],
      responses: [
        { status: 200, description: "User found", type: "User" },
        { status: 404, description: "User not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get user by ID" } },
        { decorator: "ApiResponse", params: { status: 200, description: "User found" } },
        { decorator: "ApiResponse", params: { status: 404, description: "User not found" } }
      ]
    },
    {
      method: "GET",
      path: "me",
      functionName: "getProfile",
      description: "Get current user's profile",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      responses: [
        { status: 200, description: "Current user profile", type: "User" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get current user profile" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Current user profile" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "PATCH",
      path: ":id",
      functionName: "update",
      description: "Update user profile",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "User ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "UpdateUserDto",
        description: "User update data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 200, description: "User updated successfully", type: "User" },
        { status: 403, description: "Forbidden - can only update own profile", type: "void" },
        { status: 404, description: "User not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Update user profile" } },
        { decorator: "ApiResponse", params: { status: 200, description: "User updated" } },
        { decorator: "ApiBearerAuth" }
      ]
    }
  ],
  dependencies: ["UsersService"],
  swaggerTags: ["users"]
}; 