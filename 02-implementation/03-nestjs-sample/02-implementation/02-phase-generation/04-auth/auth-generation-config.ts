// Authentication Generation Configuration - Step 4
// JWT authentication system with strategies, guards, and auth service

import { jwtConfig, bcryptConfig } from './auths/auth-config';
import { authStrategies } from './auths/auth-strategies';
import { authGuards } from './auths/auth-guards';
import { authServiceSpec } from './auths/auth-service';
import { authControllerSpec } from './auths/auth-controller';
import { authBusinessRules } from './business-rules';

export const authConfig = {
  jwt: jwtConfig,
  bcrypt: bcryptConfig,
  strategies: authStrategies,
  guards: authGuards,
  authService: authServiceSpec,
  authController: authControllerSpec
};

export const businessRules = authBusinessRules;

// Re-export types for external consumption
export * from './types';

// Re-export individual components for external consumption
export { jwtConfig, bcryptConfig } from './auths/auth-config';
export { authStrategies } from './auths/auth-strategies';
export { authGuards } from './auths/auth-guards';
export { authServiceSpec } from './auths/auth-service';
export { authControllerSpec } from './auths/auth-controller';
export { authBusinessRules } from './business-rules'; 