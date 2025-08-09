// Offer Entity Configuration
// Financial contributions toward wishes

import { DetailedEntitySpec } from '../types';

export const offerEntitySpec: DetailedEntitySpec = {
  name: "Offer",
  tableName: "offers",
  description: "Financial contributions toward wishes",
  fields: [
    {
      name: "id",
      type: "number",
      description: "Primary key auto-generated",
      typeormDecorator: { type: "int" },
      validationDecorators: []
    },
    {
      name: "amount",
      type: "decimal",
      description: "Amount being offered",
      typeormDecorator: { type: "decimal", precision: 10, scale: 2 },
      validationDecorators: [
        { decorator: "IsNumber", params: { maxDecimalPlaces: 2 }, message: "Amount must be a number with max 2 decimal places" },
        { decorator: "Min", params: [1], message: "Amount must be at least 1" }
      ],
      transformDecorators: [
        { decorator: "Transform", transformFunction: "({ value }) => Math.round(Number(value) * 100) / 100" }
      ]
    },
    {
      name: "hidden",
      type: "boolean",
      description: "Whether the offer should be hidden from public view",
      typeormDecorator: { type: "boolean", default: false },
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "IsBoolean", message: "Hidden must be a boolean" }
      ]
    },
    {
      name: "message",
      type: "string",
      description: "Optional message with the offer",
      typeormDecorator: { type: "varchar", length: 200, nullable: true },
      validationDecorators: [
        { decorator: "IsOptional" },
        { decorator: "Length", params: [1, 200], message: "Message must be 1-200 characters" }
      ]
    }
  ],
  relationships: [
    {
      type: "ManyToOne",
      target: "User",
      description: "User making the offer",
      decoratorParams: {}
    },
    {
      type: "ManyToOne",
      target: "Wish",
      description: "Wish this offer is for",
      decoratorParams: {}
    }
  ],
  businessRules: ["OR-001", "OR-002", "OR-003", "OR-004"],
  timestamps: true
}; 