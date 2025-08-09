// Wishlist Entity Configuration
// Collections of wishes organized by users

import { DetailedEntitySpec } from '../types';

export const wishlistEntitySpec: DetailedEntitySpec = {
  name: "Wishlist",
  tableName: "wishlists",
  description: "Collections of wishes organized by users",
  fields: [
    {
      name: "id",
      type: "number",
      description: "Primary key auto-generated",
      typeormDecorator: { type: "int" },
      validationDecorators: []
    },
    {
      name: "name",
      type: "string",
      description: "Wishlist name/title",
      typeormDecorator: { type: "varchar", length: 250 },
      validationDecorators: [
        { decorator: "IsString", message: "Name must be a string" },
        { decorator: "Length", params: [1, 250], message: "Name must be 1-250 characters" },
        { decorator: "IsNotEmpty", message: "Name is required" }
      ]
    },
    {
      name: "description",
      type: "text",
      description: "Optional description of the wishlist",
      typeormDecorator: { type: "text", nullable: true },
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsString", message: "Description must be a string" },
        { decorator: "Length", params: [1, 1500], message: "Description must be 1-1500 characters" }
      ]
    },
    {
      name: "image",
      type: "string",
      description: "Cover image URL for the wishlist",
      typeormDecorator: { type: "varchar" },
      validationDecorators: [
        { decorator: "IsUrl", message: "Image must be a valid URL" },
        { decorator: "IsNotEmpty", message: "Image is required" }
      ]
    }
  ],
  relationships: [
    {
      type: "ManyToOne",
      target: "User",
      description: "User who owns this wishlist",
      decoratorParams: {}
    },
    {
      type: "ManyToMany",
      target: "Wish",
      description: "Wishes included in this wishlist",
      decoratorParams: {}
    }
  ],
  businessRules: ["WLR-001", "WLR-002", "WLR-003"],
  timestamps: true
}; 