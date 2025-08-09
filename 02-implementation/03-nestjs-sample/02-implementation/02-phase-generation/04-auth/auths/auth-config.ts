// Core Authentication Configuration
// JWT and bcrypt settings

import { JWTConfig, BcryptConfig } from '../types';

export const jwtConfig: JWTConfig = {
  secret: "yourSecretKey",
  expiresIn: "1d",
  algorithm: "HS256"
};

export const bcryptConfig: BcryptConfig = {
  saltRounds: 10
}; 