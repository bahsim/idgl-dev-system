// Create Wishlist DTO Configuration
// Data Transfer Object for creating new Wishlist entities

import { CreateDTOSpec } from '../types';

export const createWishlistDtoSpec: CreateDTOSpec = {
  entityName: "Wishlist",
  className: "CreateWishlistDto",
  fields: [
    {
      name: "name",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsString", message: "Name must be a string" },
        { decorator: "Length", params: [1, 250], message: "Name must be 1-250 characters" },
        { decorator: "IsNotEmpty", message: "Name is required" }
      ],
      apiProperty: {
        description: "Wishlist name/title",
        example: "Birthday 2024",
        type: "string"
      }
    },
    {
      name: "description",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsString", message: "Description must be a string" },
        { decorator: "Length", params: [1, 1500], message: "Description must be 1-1500 characters" }
      ],
      apiProperty: {
        description: "Optional description of the wishlist",
        example: "Items I'm hoping to receive for my upcoming birthday celebration",
        type: "string"
      }
    },
    {
      name: "image",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsUrl", message: "Image must be a valid URL" },
        { decorator: "IsNotEmpty", message: "Image is required" }
      ],
      apiProperty: {
        description: "Cover image URL for the wishlist",
        example: "https://example.com/birthday-wishlist.jpg",
        type: "string",
        format: "url"
      }
    }
  ]
};