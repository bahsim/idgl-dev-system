// Create Wish DTO Configuration
// Data Transfer Object for creating new Wish entities

import { CreateDTOSpec } from '../types';

export const createWishDtoSpec: CreateDTOSpec = {
  entityName: "Wish",
  className: "CreateWishDto",
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
        description: "Gift item name/title",
        example: "Vintage Board Game Collection",
        type: "string"
      }
    },
    {
      name: "link",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsUrl", message: "Link must be a valid URL" },
        { decorator: "IsNotEmpty", message: "Link is required" }
      ],
      apiProperty: {
        description: "URL link to the item",
        example: "https://boardgamegeek.com/boardgame/123456",
        type: "string",
        format: "url"
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
        description: "Image URL for the item",
        example: "https://example.com/board-game-image.jpg",
        type: "string",
        format: "url"
      }
    },
    {
      name: "price",
      type: "decimal",
      required: true,
      validationDecorators: [
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Price must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Price must be at least 1" }
      ],
      apiProperty: {
        description: "Target price for the item",
        example: 89.99,
        type: "number",
        minimum: 1
      }
    },
    {
      name: "description",
      type: "string",
      required: true,
      validationDecorators: [
        { decorator: "IsString", message: "Description must be a string" },
        { decorator: "Length", params: [1, 1024], message: "Description must be 1-1024 characters" },
        { decorator: "IsNotEmpty", message: "Description is required" }
      ],
      apiProperty: {
        description: "Detailed description of the item",
        example: "A collection of classic strategy board games that would make a perfect addition to game night.",
        type: "string"
      }
    }
  ]
}; 