// Create User DTO Configuration
// Data Transfer Object for creating new User entities

import { CreateDTOSpec } from '../types';

export const createUserDtoSpec: CreateDTOSpec = {
  entityName: "User",
  className: "CreateUserDto",
  fields: [
    {
      name: "username",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsString", message: "Username must be a string" },
        { decorator: "Length", params: [2, 30], message: "Username must be 2-30 characters" },
        { decorator: "IsNotEmpty", message: "Username is required" }
      ],
      apiProperty: {
        description: "Unique username for login and identification",
        example: "john_doe",
        type: "string"
      }
    },
    {
      name: "about",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "Length", params: [2, 200], message: "About must be 2-200 characters" }
      ],
      apiProperty: {
        description: "User bio/description",
        example: "I love collecting vintage books and board games",
        type: "string"
      }
    },
    {
      name: "avatar",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsUrl", message: "Avatar must be a valid URL" }
      ],
      apiProperty: {
        description: "Profile picture URL",
        example: "https://i.pravatar.cc/300",
        type: "string",
        format: "url"
      }
    },
    {
      name: "email",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsEmail", message: "Email must be valid" },
        { decorator: "IsNotEmpty", message: "Email is required" }
      ],
      apiProperty: {
        description: "Unique email for authentication",
        example: "john.doe@example.com",
        type: "string",
        format: "email"
      }
    },
    {
      name: "password",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsString", message: "Password must be a string" },
        { decorator: "MinLength", params: [8], message: "Password must be at least 8 characters" }
      ],
      apiProperty: {
        description: "Password for authentication (min 8 characters)",
        example: "securePassword123",
        type: "string"
      }
    }
  ]
}; 