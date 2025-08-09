// Update User DTO Configuration
// Data Transfer Object for updating existing User entities

import { UpdateDTOSpec } from '../types';

export const updateUserDtoSpec: UpdateDTOSpec = {
  entityName: "User",
  className: "UpdateUserDto",
  fields: [
    {
      name: "username",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsString", message: "Username must be a string" },
        { decorator: "Length", params: [2, 30], message: "Username must be 2-30 characters" }
      ],
      apiProperty: {
        description: "Unique username for login and identification",
        example: "john_doe_updated",
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
        example: "Updated bio about my interests",
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
        example: "https://i.pravatar.cc/400",
        type: "string",
        format: "url"
      }
    },
    {
      name: "email",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsEmail", message: "Email must be valid" }
      ],
      apiProperty: {
        description: "Email for authentication",
        example: "john.updated@example.com",
        type: "string",
        format: "email"
      }
    }
  ]
}; 