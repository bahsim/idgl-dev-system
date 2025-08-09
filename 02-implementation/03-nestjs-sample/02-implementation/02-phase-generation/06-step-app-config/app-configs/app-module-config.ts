// App Module Configuration - Application Core Setup
// Defines module imports, controllers, providers, and global configuration

import type { AppModuleSpec } from '../types';

export const appModuleConfig: AppModuleSpec = {
  imports: [
    {
      moduleName: "ConfigModule",
      configType: "forRoot",
      config: { isGlobal: true }
    },
    {
      moduleName: "TypeOrmModule",
      configType: "forRoot",
      config: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "nest_project",
        username: "student",
        password: "student",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        logging: false
      }
    },
    {
      moduleName: "PassportModule",
      configType: "register",
      config: { defaultStrategy: "jwt" }
    },
    {
      moduleName: "JwtModule",
      configType: "register",
      config: {
        secret: "yourSecretKey",
        signOptions: { expiresIn: "1d" }
      }
    },
    { moduleName: "UsersModule" },
    { moduleName: "WishesModule" },
    { moduleName: "WishlistsModule" },
    { moduleName: "OffersModule" },
    { moduleName: "AuthModule" }
  ],
  controllers: ["AppController"],
  providers: ["AppService"],
  globalMiddleware: [],
  globalPipes: ["ValidationPipe"],
  globalFilters: []
}; 