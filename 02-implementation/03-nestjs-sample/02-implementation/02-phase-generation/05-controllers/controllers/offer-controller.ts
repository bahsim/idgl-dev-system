// Offer Controller Configuration
// Offer management endpoints with business rule enforcement

import { ControllerSpec } from '../types';

export const offerControllerSpec: ControllerSpec = {
  entityName: "Offer",
  controllerName: "OffersController",
  routePath: "offers",
  description: "Offer management endpoints",
  endpoints: [
    {
      method: "GET",
      path: "",
      functionName: "findAll",
      description: "Get all offers",
      guards: [],
      parameters: [],
      responses: [
        { status: 200, description: "List of offers", type: "Offer[]" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get all offers" } },
        { decorator: "ApiResponse", params: { status: 200, description: "List of offers" } }
      ]
    },
    {
      method: "GET",
      path: ":id",
      functionName: "findOne",
      description: "Get single offer by ID",
      guards: [],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Offer ID", validation: ["ParseIntPipe"] }
      ],
      responses: [
        { status: 200, description: "Offer found", type: "Offer" },
        { status: 404, description: "Offer not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Get offer by ID" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Offer found" } },
        { decorator: "ApiResponse", params: { status: 404, description: "Offer not found" } }
      ]
    },
    {
      method: "POST",
      path: "",
      functionName: "create",
      description: "Create new offer",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "CreateOfferDto",
        description: "Offer creation data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 201, description: "Offer created successfully", type: "Offer" },
        { status: 400, description: "Bad request - business rule violation", type: "void" },
        { status: 403, description: "Forbidden - cannot offer on own wish", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Create new offer" } },
        { decorator: "ApiResponse", params: { status: 201, description: "Offer created" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "PATCH",
      path: ":id",
      functionName: "update",
      description: "Update offer",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Offer ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      requestBody: {
        type: "UpdateOfferDto",
        description: "Offer update data",
        validation: ["ValidationPipe"]
      },
      responses: [
        { status: 200, description: "Offer updated successfully", type: "Offer" },
        { status: 403, description: "Forbidden - not offer owner", type: "void" },
        { status: 404, description: "Offer not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Update offer" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Offer updated" } },
        { decorator: "ApiBearerAuth" }
      ]
    },
    {
      method: "DELETE",
      path: ":id",
      functionName: "remove",
      description: "Delete offer",
      guards: ["JwtAuthGuard"],
      parameters: [
        { name: "id", type: "number", source: "param", required: true, description: "Offer ID", validation: ["ParseIntPipe"] },
        { name: "req", type: "Request", source: "request", required: true, description: "Request object with user" }
      ],
      responses: [
        { status: 200, description: "Offer deleted successfully", type: "void" },
        { status: 403, description: "Forbidden - not offer owner", type: "void" },
        { status: 404, description: "Offer not found", type: "void" }
      ],
      swaggerDecorators: [
        { decorator: "ApiOperation", params: { summary: "Delete offer" } },
        { decorator: "ApiResponse", params: { status: 200, description: "Offer deleted" } },
        { decorator: "ApiBearerAuth" }
      ]
    }
  ],
  dependencies: ["OffersService"],
  swaggerTags: ["offers"]
}; 