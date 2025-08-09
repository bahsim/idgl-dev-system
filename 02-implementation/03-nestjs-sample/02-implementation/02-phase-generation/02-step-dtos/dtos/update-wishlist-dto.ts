// Update Wishlist DTO Configuration
// Data Transfer Object for updating existing Wishlist entities

import { UpdateDTOSpec } from '../types';

export const updateWishlistDtoSpec: UpdateDTOSpec = {
  entityName: "Wishlist",
  className: "UpdateWishlistDto",
  fields: [
    {
      name: "name",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsString", message: "Name must be a string" },
        { decorator: "Length", params: [1, 250], message: "Name must be 1-250 characters" }
      ],
      apiProperty: {
        description: "Wishlist name/title",
        example: "Updated Birthday 2024",
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
        example: "Updated description for my birthday wishlist",
        type: "string"
      }
    },
    {
      name: "image",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsUrl", message: "Image must be a valid URL" }
      ],
      apiProperty: {
        description: "Cover image URL for the wishlist",
        example: "https://example.com/updated-wishlist.jpg",
        type: "string",
        format: "url"
      }
    }
  ]
}; 