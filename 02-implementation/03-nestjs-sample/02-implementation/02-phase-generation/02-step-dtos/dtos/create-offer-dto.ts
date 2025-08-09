// Create Offer DTO Configuration
// Data Transfer Object for creating new Offer entities

import { CreateDTOSpec } from '../types';

export const createOfferDtoSpec: CreateDTOSpec = {
  entityName: "Offer",
  className: "CreateOfferDto",
  fields: [
    {
      name: "itemId",
      type: "number",
      required: true,
      validationDecorators: [
        { decorator: "IsNumber", message: "Item ID must be a number" },
        { decorator: "IsNotEmpty", message: "Item ID is required" }
      ],
      apiProperty: {
        description: "ID of the wish this offer is for",
        example: 1,
        type: "number"
      }
    },
    {
      name: "amount",
      type: "decimal",
      required: true,
      validationDecorators: [
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Amount must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Amount must be at least 1" }
      ],
      apiProperty: {
        description: "Amount being offered",
        example: 25.00,
        type: "number",
        minimum: 1
      }
    },
    {
      name: "hidden",
      type: "boolean",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsBoolean", message: "Hidden must be a boolean" }
      ],
      apiProperty: {
        description: "Whether the offer should be hidden from public view",
        example: false,
        type: "boolean"
      }
    },
    {
      name: "message",
      type: "string",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "Length", params: [1, 200], message: "Message must be 1-200 characters" }
      ],
      apiProperty: {
        description: "Optional message with the offer",
        example: "Hope this helps you get closer to your goal!",
        type: "string"
      }
    }
  ]
}; 