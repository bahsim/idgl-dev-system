// Offer Service Configuration
// Offer management with business rule enforcement and wish total updates

import { ServiceSpec } from '../types';

export const offerServiceSpec: ServiceSpec = {
  entityName: "Offer",
  serviceName: "OffersService",
  description: "Offer management with business rule enforcement and wish total updates",
  methods: [
    {
      name: "findAll",
      description: "Get all offers with optional filtering",
      parameters: [],
      returnType: "Promise<Offer[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "findOne",
      description: "Get single offer by ID",
      parameters: [
        { name: "id", type: "number", required: true, description: "Offer ID" }
      ],
      returnType: "Promise<Offer>",
      businessRules: [],
      errorHandling: [
        { condition: "Offer not found", errorType: "NotFoundException", message: "Offer not found" }
      ]
    },
    {
      name: "create",
      description: "Create new offer with business rule validation",
      parameters: [
        { name: "createOfferDto", type: "CreateOfferDto", required: true, description: "Offer creation data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Offer>",
      businessRules: ["OR-001", "OR-002"],
      errorHandling: [
        { condition: "Wish not found", errorType: "NotFoundException", message: "Wish not found" },
        { condition: "Own wish", errorType: "ForbiddenException", message: "You cannot create offers on your own wishes" },
        { condition: "Amount exceeds needed", errorType: "BadRequestException", message: "Offer amount exceeds remaining needed amount" }
      ]
    },
    {
      name: "update",
      description: "Update offer with ownership validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "Offer ID" },
        { name: "updateOfferDto", type: "UpdateOfferDto", required: true, description: "Offer update data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Offer>",
      businessRules: ["OR-003"],
      errorHandling: [
        { condition: "Offer not found", errorType: "NotFoundException", message: "Offer not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only edit your own offers" }
      ]
    },
    {
      name: "remove",
      description: "Delete offer and update wish total",
      parameters: [
        { name: "id", type: "number", required: true, description: "Offer ID" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<void>",
      businessRules: ["OR-004"],
      errorHandling: [
        { condition: "Offer not found", errorType: "NotFoundException", message: "Offer not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only delete your own offers" }
      ]
    }
  ],
  businessRules: [
    {
      id: "OR-001",
      description: "Users cannot create offers on their own wishes",
      entity: "Offer",
      implementation: "Verify wish.owner.id does not equal currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You cannot create offers on your own wishes"
    },
    {
      id: "OR-002",
      description: "Offer amount cannot exceed remaining needed amount",
      entity: "Offer",
      implementation: "Check (wish.price - wish.raised) >= offer.amount",
      errorType: "BadRequestException",
      errorMessage: "Offer amount exceeds remaining needed amount"
    },
    {
      id: "OR-003",
      description: "Users can only edit their own offers",
      entity: "Offer",
      implementation: "Verify offer.user.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only edit your own offers"
    },
    {
      id: "OR-004",
      description: "Users can only delete their own offers",
      entity: "Offer",
      implementation: "Verify offer.user.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only delete your own offers"
    }
  ],
  dependencies: ["Repository<Offer>", "Repository<Wish>", "QueryRunner"]
}; 