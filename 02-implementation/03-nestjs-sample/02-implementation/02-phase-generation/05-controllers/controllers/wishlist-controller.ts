// Wishlist Controller Configuration
// Wishlist management endpoints with ownership validation

import { ControllerSpec } from '../types';

export const wishlistControllerSpec: ControllerSpec = {
  entityName: "Wishlist",
  controllerName: "WishlistsController",
  routePath: "wishlists",
  description: "Wishlist management endpoints",
  endpoints: [
    {
      method: "GET",
      path: "",
      functionName: "findAll",
      description: "Get all wishlists",
      guards: [],
      parameters: [],
      responses: [
        { status: 200, description: "List of wishlists", type: "Wishlist[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get all wishlists" } },
        { decorator: "ApiResponse", params: { status: 200, description: "List of wishlists" } }
      ]
    },
    {
      method: "GET",
      path: ":id",
      functionName: "findOne",
      description: "Get single wishlist by ID",
      guards: [],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wishlist ID", validation: ["ParseIntPipe"] }
      ],
      responses: [
        { status: 200, description: "Wishlist found", type: "Wishlist" },
        { status: 404, description: "Wishlist not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get wishlist by ID" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wishlist found" } },
        { decorator: "ApiResponse", params: { status: 404, description: "Wishlist not found" } }
      ]
    },
    {
      method: "POST",
      path: "",
      functionName: "create",
      description: "Create new wishlist",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "CreateWishlistDto",
        description: "Wishlist creation data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 201, description: "Wishlist created successfully", type: "Wishlist" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Create new wishlist" } },
        { decorator: "ApiResponse", params: { status: 201, description: "Wishlist created" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "PATCH",
      path: ":id",
      functionName: "update",
      description: "Update wishlist",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wishlist ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "UpdateWishlistDto",
        description: "Wishlist update data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 200, description: "Wishlist updated successfully", type: "Wishlist" },
        { status: 403, description: "Forbidden - not wishlist owner", type: "void" },
        { status: 404, description: "Wishlist not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Update wishlist" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wishlist updated" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "DELETE",
      path: ":id",
      functionName: "remove",
      description: "Delete wishlist",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wishlist ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      responses: [
        { status: 200, description: "Wishlist deleted successfully", type: "void" },
        { status: 403, description: "Forbidden - not wishlist owner", type: "void" },
        { status: 404, description: "Wishlist not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Delete wishlist" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wishlist deleted" } },
        { decorator: "ApiBearerAuth" }
      ]
    }
  ],
  dependencies: ["WishlistsService"],
  swaggerTags: ["wishlists"]
}; 