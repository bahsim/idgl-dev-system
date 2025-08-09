// Update Offer DTO Configuration
// Data Transfer Object for updating existing Offer entities

import { UpdateDTOSpec } from '../types';

export const updateOfferDtoSpec: UpdateDTOSpec = {
  entityName: "Offer",
  className: "UpdateOfferDto",
  fields: [
    {
      name: "amount",
      type: "decimal",
      required: false,
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Amount must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Amount must be at least 1" }
      ],
      apiProperty: {
        description: "Amount being offered",
        example: 30.00,
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
        example: true,
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
        example: "Updated message for my contribution",
        type: "string"
      }
    }
  ]
}; 