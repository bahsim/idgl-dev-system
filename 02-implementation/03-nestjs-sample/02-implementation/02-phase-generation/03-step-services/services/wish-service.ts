// Wish Service Configuration
// Wish management with ownership validation and copy functionality

import { ServiceSpec } from '../types';

export const wishServiceSpec: ServiceSpec = {
  entityName: "Wish",
  serviceName: "WishesService",
  description: "Wish management with ownership validation and copy functionality",
  methods: [
    {
      name: "findAll",
      description: "Get all wishes with optional user context for enhanced data",
      parameters: [
        { name: "currentUser", type: "User | null", required: false, description: "Current user for context" }
      ],
      returnType: "Promise<Wish[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "findOne",
      description: "Get single wish by ID",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wish ID" }
      ],
      returnType: "Promise<Wish>",
      businessRules: [],
      errorHandling: [
        { condition: "Wish not found", errorType: "NotFoundException", message: "Wish not found" }
      ]
    },
    {
      name: "findLast",
      description: "Get recently created wishes",
      parameters: [],
      returnType: "Promise<Wish[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "findTop",
      description: "Get wishes with highest funding",
      parameters: [],
      returnType: "Promise<Wish[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "create",
      description: "Create new wish for authenticated user",
      parameters: [
        { name: "createWishDto", type: "CreateWishDto", required: true, description: "Wish creation data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Wish>",
      businessRules: ["WR-001"],
      errorHandling: []
    },
    {
      name: "update",
      description: "Update wish with ownership validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wish ID" },
        { name: "updateWishDto", type: "UpdateWishDto", required: true, description: "Wish update data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Wish>",
      businessRules: ["WR-002"],
      errorHandling: [
        { condition: "Wish not found", errorType: "NotFoundException", message: "Wish not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only edit your own wishes" }
      ]
    },
    {
      name: "remove",
      description: "Delete wish with ownership validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wish ID" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<void>",
      businessRules: ["WR-003"],
      errorHandling: [
        { condition: "Wish not found", errorType: "NotFoundException", message: "Wish not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only delete your own wishes" }
      ]
    },
    {
      name: "copy",
      description: "Copy wish and increment original's counter atomically",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wish ID to copy" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Wish>",
      businessRules: ["WR-005", "WR-007"],
      errorHandling: [
        { condition: "Wish not found", errorType: "NotFoundException", message: "Wish not found" }
      ]
    }
  ],
  businessRules: [
    {
      id: "WR-001",
      description: "All wishes must have an owner",
      entity: "Wish",
      implementation: "Set owner to current authenticated user",
      errorType: "BadRequestException",
      errorMessage: "Wish must have an owner"
    },
    {
      id: "WR-002",
      description: "Users can only edit their own wishes",
      entity: "Wish",
      implementation: "Verify wish.owner.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only edit their own wishes"
    },
    {
      id: "WR-003",
      description: "Users can only delete their own wishes",
      entity: "Wish",
      implementation: "Verify wish.owner.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only delete your own wishes"
    },
    {
      id: "WR-005",
      description: "Any authenticated user can copy any wish",
      entity: "Wish",
      implementation: "Create copy with current user as owner",
      errorType: "BadRequestException",
      errorMessage: "Failed to copy wish"
    },
    {
      id: "WR-007",
      description: "Copying increments original wish's copied counter",
      entity: "Wish",
      implementation: "Atomic increment of original wish's copied field",
      errorType: "BadRequestException",
      errorMessage: "Failed to update copy counter"
    }
  ],
  dependencies: ["Repository<Wish>", "QueryRunner"]
}; 