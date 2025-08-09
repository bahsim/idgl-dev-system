// Application Configuration Generation - Step 6
// Clean index importing from granular configuration files

// Export shared types
export type { 
  AppConfigSpec, 
  AppModuleSpec, 
  ModuleImportSpec, 
  MainSpec, 
  SwaggerMainSpec, 
  ValidationSpec, 
  DatabaseConfigSpec, 
  EnvironmentSpec, 
  ModuleSpec, 
  ValidationRule 
} from './types';

// Import granular configurations
import { appModuleConfig } from './app-configs/app-module-config';
import { mainConfig } from './app-configs/main-config';
import { databaseConfig } from './app-configs/database-config';
import { environmentConfig } from './app-configs/environment-config';
import { moduleSpecs } from './app-configs/module-specs';
import { validationRules } from './app-configs/validation-rules';

// Export combined configuration
export const appConfigSpec = {
  appModule: appModuleConfig,
  main: mainConfig,
  database: databaseConfig,
  environment: environmentConfig
};

// Export granular configurations
export { moduleSpecs, validationRules }; 