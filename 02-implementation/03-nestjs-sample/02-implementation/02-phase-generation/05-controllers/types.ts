// Shared types for Controller Generation Configuration
// Type definitions for REST API controller specifications

export interface ControllerSpec {
  entityName: string;
  controllerName: string;
  routePath: string;
  description: string;
  endpoints: EndpointSpec[];
  dependencies: string[];
  swaggerTags: string[];
}

export interface EndpointSpec {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  functionName: string;
  description: string;
  guards: string[];
  parameters: ParameterSpec[];
  requestBody?: RequestBodySpec;
  responses: ResponseSpec[];
  swaggerDecorators: SwaggerDecoratorSpec[];
}

export interface ParameterSpec {
  name: string;
  type: string;
  source: 'param' | 'query' | 'body' | 'request';
  required: boolean;
  description: string;
  validation?: string[];
}

export interface RequestBodySpec {
  type: string;
  description: string;
  validation: string[];
}

export interface ResponseSpec {
  status: number;
  description: string;
  type: string;
}

export interface SwaggerDecoratorSpec {
  decorator: string;
  params?: any;
} 