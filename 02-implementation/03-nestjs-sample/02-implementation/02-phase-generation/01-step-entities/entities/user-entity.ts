// User Entity Configuration
// Platform users with authentication and profile management

import { DetailedEntitySpec } from '../types';

export const userEntitySpec: DetailedEntitySpec = {
  name: "User",
  tableName: "users",
  description: "Platform users with authentication and profile management",
  fields: [
    {
      name: "id",
      type: "number",
      description: "Primary key auto-generated",
      typeormDecorator: { type: "int" },
      validationDecorators: []
    },
    {
      name: "username",
      type: "string",
      description: "Unique username for login and identification",
      typeormDecorator: { type: "varchar", length: 30, unique: true },
      validationDecorators: [
        { decorator: "IsString", message: "Username must be a string" },
        { decorator: "Length", params: [2, 30], message: "Username must be 2-30 characters" },
        { decorator: "IsNotEmpty", message: "Username is required" }
      ]
    },
    {
      name: "about",
      type: "string",
      description: "User bio/description",
      typeormDecorator: { type: "varchar", length: 200, default: "Haven't told anything about myself yet" },
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "Length", params: [2, 200], message: "About must be 2-200 characters" }
      ]
    },
    {
      name: "avatar",
      type: "string",
      description: "Profile picture URL",
      typeormDecorator: { type: "varchar", default: "https://i.pravatar.cc/300" },
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsUrl", message: "Avatar must be a valid URL" }
      ]
    },
    {
      name: "email",
      type: "string",
      description: "Unique email for authentication",
      typeormDecorator: { type: "varchar", unique: true },
      validationDecorators: [
        { decorator: "IsEmail", message: "Email must be valid" },
        { decorator: "IsNotEmpty", message: "Email is required" }
      ]
    },
    {
      name: "password",
      type: "string",
      description: "Hashed password for authentication",
      typeormDecorator: { type: "varchar" },
      validationDecorators: [
        { decorator: "IsString", message: "Password must be a string" },
        { decorator: "MinLength", params: [8], message: "Password must be at least 8 characters" }
      ]
    }
  ],
  relationships: [
    {
      type: "OneToMany",
      target: "Wish",
      description: "Wishes owned by this user",
      decoratorParams: { mappedBy: "owner" }
    },
    {
      type: "OneToMany",
      target: "Offer",
      description: "Offers made by this user",
      decoratorParams: { mappedBy: "user" }
    },
    {
      type: "OneToMany",
      target: "Wishlist",
      description: "Wishlists created by this user",
      decoratorParams: { mappedBy: "owner" }
    }
  ],
  businessRules: ["UR-001", "UR-002", "UR-003", "UR-004"],
  timestamps: true
}; 