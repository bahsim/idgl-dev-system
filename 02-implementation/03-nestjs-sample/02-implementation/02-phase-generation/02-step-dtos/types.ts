// Shared Types for DTO Generation
// Common interfaces used across all DTO configurations

export interface DTOFieldSpec {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'decimal';
  required: boolean;
  validationDecorators: ValidationDecorator[];
  apiProperty: ApiPropertySpec;
}

export interface ValidationDecorator {
  decorator: string;
  params?: any;
  message?: string;
}

export interface ApiPropertySpec {
  description: string;
  example?: any;
  type?: string;
  format?: string;
  minimum?: number;
  maximum?: number;
}

export interface CreateDTOSpec {
  entityName: string;
  className: string;
  fields: DTOFieldSpec[];
}

export interface UpdateDTOSpec {
  entityName: string;
  className: string;
  fields: DTOFieldSpec[];
}
