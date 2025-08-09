// Wish Entity Configuration
// Gift items that can receive collective funding

import { DetailedEntitySpec } from '../types';

export const wishEntitySpec: DetailedEntitySpec = {
  name: "Wish",
  tableName: "wishes",
  description: "Gift items that can receive collective funding",
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
      description: "Gift item name/title",
      typeormDecorator: { type: "varchar", length: 250 },
      validationDecorators: [
        { decorator: "IsString", message: "Name must be a string" },
        { decorator: "Length", params: [1, 250], message: "Name must be 1-250 characters" },
        { decorator: "IsNotEmpty", message: "Name is required" }
      ]
    },
    {
      name: "link",
      type: "string", 
      description: "URL link to the item",
      typeormDecorator: { type: "varchar" },
      validationDecorators: [
        { decorator: "IsUrl", message: "Link must be a valid URL" },
        { decorator: "IsNotEmpty", message: "Link is required" }
      ]
    },
    {
      name: "image",
      type: "string",
      description: "Image URL for the item",
      typeormDecorator: { type: "varchar" },
      validationDecorators: [
        { decorator: "IsUrl", message: "Image must be a valid URL" },
        { decorator: "IsNotEmpty", message: "Image is required" }
      ]
    },
    {
      name: "price",
      type: "decimal",
      description: "Target price for the item",
      typeormDecorator: { type: "decimal", precision: 10, scale: 2 },
      validationDecorators: [
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Price must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Price must be at least 1" }
      ],
      transformDecorators: [
        { decorator: "Transform", transformFunction: "({ value }) => Math.round(Number(value) * 100) / 100" }
      ]
    },
    {
      name: "raised",
      type: "decimal",
      description: "Amount raised through offers",
      typeormDecorator: { type: "decimal", precision: 10, scale: 2, default: 0 },
      validationDecorators: [
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Raised must be a number with max 2 decimal places" },
        { decorator: "Min", params: [0], message: "Raised amount cannot be negative" }
      ],
      transformDecorators: [
        { decorator: "Transform", transformFunction: "({ value }) => Math.round(Number(value) * 100) / 100" }
      ]
    },
    {
      name: "description",
      type: "text",
      description: "Detailed description of the item",
      typeormDecorator: { type: "text" },
      validationDecorators: [
        { decorator: "IsString", message: "Description must be a string" },
        { decorator: "Length", params: [1, 1024], message: "Description must be 1-1024 characters" },
        { decorator: "IsNotEmpty", message: "Description is required" }
      ]
    },
    {
      name: "copied",
      type: "number",
      description: "Number of times this wish was copied",
      typeormDecorator: { type: "int", default: 0 },
      validationDecorators: [
        { decorator: "IsNumber", message: "Copied must be a number" },
        { decorator: "Min", params: [0], message: "Copied count cannot be negative" }
      ]
    }
  ],
  relationships: [
    {
      type: "ManyToOne",
      target: "User",
      description: "User who owns this wish",
      decoratorParams: {}
    },
    {
      type: "OneToMany",
      target: "Offer",
      description: "Offers made for this wish",
      decoratorParams: { mappedBy: "item" }
    },
    {
      type: "ManyToMany",
      target: "Wishlist",
      description: "Wishlists containing this wish",
      decoratorParams: { mappedBy: "wishes" }
    }
  ],
  businessRules: ["WR-001", "WR-002", "WR-003", "WR-004", "WR-005", "WR-006", "WR-007"],
  timestamps: true
}; 