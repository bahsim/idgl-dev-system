// Wish Controller Configuration
// Wish management endpoints with ownership validation and copy functionality

import { ControllerSpec } from '../types';

export const wishControllerSpec: ControllerSpec = {
  entityName: "Wish",
  controllerName: "WishesController", 
  routePath: "wishes",
  description: "Wish management endpoints",
  endpoints: [
    {
      method: "GET",
      path: "",
      functionName: "findAll",
      description: "Get all wishes with optional user context",
      guards: ["OptionalJwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", source: "request", required: false, description: "Request object with optional user" }
      ],
      responses: [
        { status: 200, description: "List of wishes", type: "Wish[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get all wishes" } },
        { decorator: "ApiResponse", params: { status: 200, description: "List of wishes" } }
      ]
    },
    {
      method: "GET",
      path: "last",
      functionName: "findLast",
      description: "Get recently created wishes",
      guards: [],
      parameters: [],
      responses: [
        { status: 200, description: "Recent wishes", type: "Wish[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get recent wishes" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Recent wishes" } }
      ]
    },
    {
      method: "GET",
      path: "top",
      functionName: "findTop",
      description: "Get wishes with highest funding",
      guards: [],
      parameters: [],
      responses: [
        { status: 200, description: "Top funded wishes", type: "Wish[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get top funded wishes" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Top funded wishes" } }
      ]
    },
    {
      method: "GET",
      path: ":id",
      functionName: "findOne",
      description: "Get single wish by ID",
      guards: [],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wish ID", validation: ["ParseIntPipe"] }
      ],
      responses: [
        { status: 200, description: "Wish found", type: "Wish" },
        { status: 404, description: "Wish not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get wish by ID" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wish found" } },
        { decorator: "ApiResponse", params: { status: 404, description: "Wish not found" } }
      ]
    },
    {
      method: "POST",
      path: "",
      functionName: "create",
      description: "Create new wish",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "CreateWishDto",
        description: "Wish creation data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 201, description: "Wish created successfully", type: "Wish" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Create new wish" } },
        { decorator: "ApiResponse", params: { status: 201, description: "Wish created" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "POST",
      path: ":id/copy",
      functionName: "copy",
      description: "Copy existing wish",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wish ID to copy", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      responses: [
        { status: 201, description: "Wish copied successfully", type: "Wish" },
        { status: 404, description: "Wish not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Copy wish" } },
        { decorator: "ApiResponse", params: { status: 201, description: "Wish copied" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "PATCH",
      path: ":id",
      functionName: "update",
      description: "Update wish",
      guards: ["JwtAuthGuard", "WishOwnerGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wish ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "UpdateWishDto",
        description: "Wish update data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 200, description: "Wish updated successfully", type: "Wish" },
        { status: 403, description: "Forbidden - not wish owner", type: "void" },
        { status: 404, description: "Wish not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Update wish" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wish updated" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "DELETE",
      path: ":id",
      functionName: "remove",
      description: "Delete wish",
      guards: ["JwtAuthGuard", "WishOwnerGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Wish ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      responses: [
        { status: 200, description: "Wish deleted successfully", type: "void" },
        { status: 403, description: "Forbidden - not wish owner", type: "void" },
        { status: 404, description: "Wish not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Delete wish" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Wish deleted" } },
        { decorator: "ApiBearerAuth" }
      ]
    }
  ],
  dependencies: ["WishesService"],
  swaggerTags: ["wishes"]
}; 