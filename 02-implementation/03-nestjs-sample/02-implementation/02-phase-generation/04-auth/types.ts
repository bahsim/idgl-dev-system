// Shared types for Authentication Generation Configuration
// Type definitions for auth strategies, guards, services, and controllers

export interface AuthConfig {
  jwt: JWTConfig;
  bcrypt: BcryptConfig;
  strategies: StrategySpec[];
  guards: GuardSpec[];
  authService: AuthServiceSpec;
  authController: AuthControllerSpec;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  algorithm: string;
}

export interface BcryptConfig {
  saltRounds: number;
}

export interface StrategySpec {
  name: string;
  type: 'jwt' | 'local';
  description: string;
  filename: string;
  validation: string;
  dependencies: string[];
}

export interface GuardSpec {
  name: string;
  description: string;
  filename: string;
  extends: string;
  customLogic?: string;
  dependencies: string[];
}

export interface AuthServiceSpec {
  methods: AuthMethodSpec[];
  dependencies: string[];
}

export interface AuthMethodSpec {
  name: string;
  description: string;
  parameters: ParameterSpec[];
  returnType: string;
  businessRules: string[];
}

export interface ParameterSpec {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface AuthControllerSpec {
  endpoints: EndpointSpec[];
  dependencies: string[];
}

export interface EndpointSpec {
  method: string;
  path: string;
  description: string;
  guards: string[];
  parameters: ParameterSpec[];
  returnType: string;
}

export interface BusinessRuleSpec {
  id: string;
  description: string;
  implementation: string;
  errorType: string;
  errorMessage: string;
} 