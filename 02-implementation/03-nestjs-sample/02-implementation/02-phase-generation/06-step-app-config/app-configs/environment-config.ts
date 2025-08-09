// Environment Configuration - Environment Variables Setup
// Defines required environment variables and default values for development

import type { EnvironmentSpec } from '../types';

export const environmentConfig: EnvironmentSpec = {
  requiredVars: [
    "DATABASE_HOST",
    "DATABASE_PORT", 
    "DATABASE_NAME",
    "DATABASE_USER",
    "DATABASE_PASSWORD",
    "JWT_SECRET"
  ],
  defaults: {
    DATABASE_HOST: "localhost",
    DATABASE_PORT: "5432",
    DATABASE_NAME: "nest_project",
    DATABASE_USER: "student", 
    DATABASE_PASSWORD: "student",
    JWT_SECRET: "yourSecretKey",
    PORT: "3000"
  }
}; 