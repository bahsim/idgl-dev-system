// Validation Rules - Global Application Setup Rules
// Defines implementation rules for validation, CORS, Swagger, and database setup

import type { ValidationRule } from '../types';

export const validationRules: ValidationRule[] = [
  {
    rule: "GLOBAL_VALIDATION_PIPE",
    description: "Enable global validation with class-validator",
    implementation: "app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))"
  },
  {
    rule: "CORS_CONFIGURATION", 
    description: "Enable CORS for frontend integration",
    implementation: "app.enableCors()"
  },
  {
    rule: "SWAGGER_SETUP",
    description: "Configure Swagger API documentation",
    implementation: "SwaggerModule.setup('api', app, document)"
  },
  {
    rule: "DATABASE_SYNCHRONIZATION",
    description: "Enable synchronize for development (disable in production)",
    implementation: "TypeORM synchronize: true for development convenience"
  }
]; 