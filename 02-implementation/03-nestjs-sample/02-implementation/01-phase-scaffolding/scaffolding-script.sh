#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# Define project name
PROJECT_NAME="wishlist-share-app"

# 1. Create a new NestJS project
echo "Step 1: Creating NestJS project: $PROJECT_NAME..."
npx --yes @nestjs/cli new $PROJECT_NAME

# Change into the new project directory
cd $PROJECT_NAME

# 2. Install necessary dependencies
echo "Step 2: Installing core dependencies..."
npm install @nestjs/config @nestjs/typeorm typeorm pg class-validator class-transformer bcrypt

echo "Step 3: Installing authentication dependencies..."
npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
npm install -D @types/passport-local @types/bcrypt @types/passport-jwt

# 3. Generate core modules and services using Nest CLI
echo "Step 4: Generating application modules and services..."
npx --yes @nestjs/cli g module users
npx --yes @nestjs/cli g service users

npx --yes @nestjs/cli g module wishes
npx --yes @nestjs/cli g service wishes

npx --yes @nestjs/cli g module wishlists
npx --yes @nestjs/cli g service wishlists

npx --yes @nestjs/cli g module offers
npx --yes @nestjs/cli g service offers

npx --yes @nestjs/cli g module auth
npx --yes @nestjs/cli g service auth

npx --yes @nestjs/cli g controller users
npx --yes @nestjs/cli g controller wishes
npx --yes @nestjs/cli g controller wishlists
npx --yes @nestjs/cli g controller offers
npx --yes @nestjs/cli g controller auth

echo "Scaffolding complete. The project '$PROJECT_NAME' is ready."
