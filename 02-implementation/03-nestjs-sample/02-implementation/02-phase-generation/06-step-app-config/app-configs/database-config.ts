// Database Configuration - PostgreSQL Connection Setup
// Defines database connection parameters, synchronization, and entity paths

import type { DatabaseConfigSpec } from '../types';

export const databaseConfig: DatabaseConfigSpec = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "nest_project",
  username: "student",
  password: "student",
  synchronize: true,
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}"]
}; 