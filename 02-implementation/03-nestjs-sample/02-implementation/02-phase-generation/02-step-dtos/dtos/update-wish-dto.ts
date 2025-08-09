// Update Wish DTO Configuration
// Data Transfer Object for updating existing Wish entities

import { UpdateDTOSpec } from '../types';

export const updateWishDtoSpec: UpdateDTOSpec = {
  entityName: "Wish",
  className: "UpdateWishDto",
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
        description: "Gift item name/title",
        example: "Updated Board Game Collection",
        type: "string"
      }
    },
    {
      name: "link",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsUrl", message: "Link must be a valid URL" }
      ],
      apiProperty: {
        description: "URL link to the item",
        example: "https://boardgamegeek.com/boardgame/updated",
        type: "string",
        format: "url"
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
        description: "Image URL for the item",
        example: "https://example.com/updated-image.jpg",
        type: "string",
        format: "url"
      }
    },
    {
      name: "price",
      type: "decimal",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Price must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Price must be at least 1" }
      ],
      apiProperty: {
        description: "Target price for the item",
        example: 99.99,
        type: "number",
        minimum: 1
      }
    },
    {
      name: "description",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsString", message: "Description must be a string" },
        { decorator: "Length", params: [1, 1024], message: "Description must be 1-1024 characters" }
      ],
      apiProperty: {
        description: "Detailed description of the item",
        example: "Updated description of the board game collection.",
        type: "string"
      }
    }
  ]
}; 