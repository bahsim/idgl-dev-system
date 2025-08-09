// Shared Types for App Configuration Generation - Step 6
// Core interfaces for application setup, modules, and configuration

export interface AppConfigSpec {
  appModule: AppModuleSpec;
  main: MainSpec;
  database: DatabaseConfigSpec;
  environment: EnvironmentSpec;
}

export interface AppModuleSpec {
  imports: ModuleImportSpec[];
  controllers: string[];
  providers: string[];
  globalMiddleware: string[];
  globalPipes: string[];
  globalFilters: string[];
}

export interface ModuleImportSpec {
  moduleName: string;
  configType?: 'forRoot' | 'forFeature' | 'register';
  config?: any;
}

export interface MainSpec {
  port: number;
  globalPrefix: string;
  corsEnabled: boolean;
  swagger: SwaggerMainSpec;
  validation: ValidationSpec;
}

export interface SwaggerMainSpec {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface ValidationSpec {
  whitelist: boolean;
  transform: boolean;
  forbidNonWhitelisted: boolean;
}

export interface DatabaseConfigSpec {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
}

export interface EnvironmentSpec {
  requiredVars: string[];
  defaults: Record<string, any>;
}

export interface ModuleSpec {
  name: string;
  path: string;
  imports: string[];
  controllers: string[];
  providers: string[];
  exports: string[];
}

export interface ValidationRule {
  rule: string;
  description: string;
  implementation: string;
} 