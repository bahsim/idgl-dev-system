// Shared types for Service Generation Configuration
// Type definitions for service method specifications and business rules

export interface ServiceMethodSpec {
  name: string;
  description: string;
  parameters: ParameterSpec[];
  returnType: string;
  businessRules: string[];
  errorHandling: ErrorSpec[];
}

export interface ParameterSpec {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ErrorSpec {
  condition: string;
  errorType: string;
  message: string;
}

export interface BusinessRuleSpec {
  id: string;
  description: string;
  entity: string;
  implementation: string;
  errorType: string;
  errorMessage: string;
}

export interface ServiceSpec {
  entityName: string;
  serviceName: string;
  description: string;
  methods: ServiceMethodSpec[];
  businessRules: BusinessRuleSpec[];
  dependencies: string[];
} 