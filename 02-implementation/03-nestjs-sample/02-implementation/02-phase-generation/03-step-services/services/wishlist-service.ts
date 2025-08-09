// Wishlist Service Configuration
// Wishlist management with ownership validation

import { ServiceSpec } from '../types';

export const wishlistServiceSpec: ServiceSpec = {
  entityName: "Wishlist",
  serviceName: "WishlistsService",
  description: "Wishlist management with ownership validation",
  methods: [
    {
      name: "findAll",
      description: "Get all wishlists",
      parameters: [],
      returnType: "Promise<Wishlist[]>",
      businessRules: [],
      errorHandling: []
    },
    {
      name: "findOne",
      description: "Get single wishlist by ID",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wishlist ID" }
      ],
      returnType: "Promise<Wishlist>",
      businessRules: [],
      errorHandling: [
        { condition: "Wishlist not found", errorType: "NotFoundException", message: "Wishlist not found" }
      ]
    },
    {
      name: "create",
      description: "Create new wishlist for authenticated user",
      parameters: [
        { name: "createWishlistDto", type: "CreateWishlistDto", required: true, description: "Wishlist creation data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Wishlist>",
      businessRules: ["WLR-001"],
      errorHandling: []
    },
    {
      name: "update",
      description: "Update wishlist with ownership validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wishlist ID" },
        { name: "updateWishlistDto", type: "UpdateWishlistDto", required: true, description: "Wishlist update data" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<Wishlist>",
      businessRules: ["WLR-002"],
      errorHandling: [
        { condition: "Wishlist not found", errorType: "NotFoundException", message: "Wishlist not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only edit your own wishlists" }
      ]
    },
    {
      name: "remove",
      description: "Delete wishlist with ownership validation",
      parameters: [
        { name: "id", type: "number", required: true, description: "Wishlist ID" },
        { name: "currentUser", type: "User", required: true, description: "Current authenticated user" }
      ],
      returnType: "Promise<void>",
      businessRules: ["WLR-003"],
      errorHandling: [
        { condition: "Wishlist not found", errorType: "NotFoundException", message: "Wishlist not found" },
        { condition: "Not owner", errorType: "ForbiddenException", message: "You can only delete your own wishlists" }
      ]
    }
  ],
  businessRules: [
    {
      id: "WLR-001",
      description: "All wishlists must have an owner",
      entity: "Wishlist",
      implementation: "Set owner to current authenticated user",
      errorType: "BadRequestException",
      errorMessage: "Wishlist must have an owner"
    },
    {
      id: "WLR-002",
      description: "Users can only edit their own wishlists",
      entity: "Wishlist",
      implementation: "Verify wishlist.owner.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only edit your own wishlists"
    },
    {
      id: "WLR-003",
      description: "Users can only delete their own wishlists",
      entity: "Wishlist",
      implementation: "Verify wishlist.owner.id equals currentUser.id",
      errorType: "ForbiddenException",
      errorMessage: "You can only delete your own wishlists"
    }
  ],
  dependencies: ["Repository<Wishlist>"]
}; 