// User Service Configuration
// User management with authentication and profile operations

import { ServiceSpec } from '../types';

export const userServiceSpec: ServiceSpec = {
  entityName: "User",
  serviceName: "UsersService",
  description: "User management with authentication and profile operations",
  methods: [
    {
      name: "findAll",
      description: "Get all users with basic public information",
      parameters: [],
      returnType: "Promise<User[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "findOne",
      description: "Get single user by ID with public information",
      parameters: [
        { name: "id", type: "number", required: true, description: "User ID" }
      ],
      returnType: "Promise<User>",
      businessRules: [],
      errorHandling: [
        { condition: "User not found", errorType: "NotFoundException", message: "User not found" }
      ]
    },
    {
      name: "findByUsername",
      description: "Find user by username for authentication",
      parameters: [
        { name: "username", type: "string", required: true, description: "Username to search" }
      ],
      returnType: "Promise<User | null>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "create",
      description: "Create new user with password hashing",
      parameters: [
        { name: "createUserDto", type: "CreateUserDto", required: true, description: "User creation data" }
      ],
      returnType: "Promise<User>",
      businessRules: ["UR-001", "UR-002"],
      errorHandling: [
        { condition: "Username already exists", errorType: "BadRequestException", message: "Username already exists" },
        { condition: "Email already exists", errorType: "BadRequestException", message: "Email already exists" }
      ]
    },
    {
      name: "update",
      description: "Update user profile with validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "User ID" },
        { name: "updateUserDto", type: "UpdateUserDto", required: true, description: "User update data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<User>",
      businessRules: ["UR-003"],
      errorHandling: [
        { condition: "User not found", errorType: "NotFoundException", message: "User not found" },
        { condition: "Not authorized", errorType: "ForbiddenException", message: "You can only update your own profile" }
      ]
    }
  ],
  businessRules: [
    {
      id: "UR-001",
      description: "Username must be unique across the platform",
      entity: "User",
      implementation: "Check username uniqueness before creation",
      errorType: "BadRequestException",
      errorMessage: "Username already exists"
    },
    {
      id: "UR-002",
      description: "Email must be unique across the platform",
      entity: "User",
      implementation: "Check email uniqueness before creation",
      errorType: "BadRequestException",
      errorMessage: "Email already exists"
    },
    {
      id: "UR-003",
      description: "Users can only update their own profile",
      entity: "User",
      implementation: "Verify currentUser.id matches target user ID",
      errorType: "ForbiddenException",
      errorMessage: "You can only update your own profile"
    }
  ],
  dependencies: ["Repository<User>", "bcrypt"]
}; 