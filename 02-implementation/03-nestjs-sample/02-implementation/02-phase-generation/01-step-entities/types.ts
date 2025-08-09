// Shared Types for Entity Generation
// Common interfaces used across all entity configurations

export interface DetailedEntitySpec {
  name: string;
  tableName: string;
  description: string;
  fields: DetailedFieldSpec[];
  relationships: DetailedRelationSpec[];
  businessRules: string[];
  timestamps: boolean;
}

export interface DetailedFieldSpec {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'decimal' | 'text';
  description: string;
  typeormDecorator: TypeORMColumnSpec;
  validationDecorators: ValidationDecorator[];
  transformDecorators?: TransformDecorator[];
}

export interface TypeORMColumnSpec {
  type: string;
  length?: number;
  precision?: number;
  scale?: number;
  unique?: boolean;
  nullable?: boolean;
  default?: any;
}

export interface ValidationDecorator {
  decorator: string;
  params?: any;
  message?: string;
}

export interface TransformDecorator {
  decorator: string;
  transformFunction: string;
}

export interface DetailedRelationSpec {
  type: 'OneToMany' | 'ManyToOne' | 'ManyToMany';
  target: string;
  description: string;
  decoratorParams: {
    mappedBy?: string;
    joinColumn?: string;
    cascade?: boolean;
    eager?: boolean;
  };
} 