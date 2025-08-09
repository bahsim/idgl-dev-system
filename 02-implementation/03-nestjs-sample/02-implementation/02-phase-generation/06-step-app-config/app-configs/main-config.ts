// Main Server Configuration - Application Bootstrap Settings
// Defines server port, CORS, Swagger documentation, and global validation

import type { MainSpec } from '../types';

export const mainConfig: MainSpec = {
  port: 3000,
  globalPrefix: "",
  corsEnabled: true,
  swagger: {
    enabled: true,
    title: "WishListShare API",
    description: "Gift sharing platform with collective funding",
    version: "1.0",
    path: "api"
  },
  validation: {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }
}; 