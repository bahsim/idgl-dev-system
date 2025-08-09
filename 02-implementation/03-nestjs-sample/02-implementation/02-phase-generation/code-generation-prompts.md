# AI Code Generation Prompts for WishListShare API

> **⚠️ Updated Structure Notice:** This file has been reorganized to use step-specific configurations for better organization and clarity.

## Prerequisites
- Ensure Phase 1 scaffolding is completed successfully
- Step-specific configurations are available in respective step folders
- Database is running and accessible

## 📁 **New Step-Specific Organization**

The generation process is now organized into focused steps with dedicated artifacts:

### **Step 1: Entity Generation** 
**Location:** `01-step-entities/`
- **Config:** `entity-generation-config.ts` 
- **Prompt:** `entity-generation-prompt.md`
- **Output:** TypeORM entities with decorators, relationships, validation

### **Step 2: DTO Generation**
**Location:** `02-step-dtos/`
- **Config:** `dto-generation-config.ts`
- **Prompt:** `dto-generation-prompt.md` 
- **Output:** Create/Update DTOs with class-validator decorators

### **Step 3: Service Generation**
**Location:** `03-step-services/`
- **Config:** `services-generation-config.ts`
- **Prompt:** `services-generation-prompt.md`
- **Output:** Business logic services with CRUD operations and rule enforcement

### **Step 4: Authentication System**
**Location:** `04-auth/`
- **Config:** `auth-generation-config.ts`
- **Prompt:** `auth-generation-prompt.md`
- **Output:** Complete JWT authentication with strategies and guards

### **Step 5: Controller Generation** 
**Location:** `05-controllers/`
- **Config:** `controllers-generation-config.ts`
- **Prompt:** `controllers-generation-prompt.md`
- **Output:** REST API controllers with guards and Swagger documentation

### **Step 6: Application Configuration**
**Location:** `06-step-app-config/`
- **Config:** `app-config-generation-config.ts`
- **Prompt:** `app-config-generation-prompt.md`
- **Output:** Module integration and application bootstrap

## 🚀 **Execution Instructions**

### **Sequential Step Execution:**

1. **Navigate to step folder:** `cd [step-folder]/`
2. **Read configuration:** Review `*-generation-config.ts` for specifications
3. **Execute prompt:** Use content from `*-generation-prompt.md` 
4. **Validate output:** Run validation commands specified in prompt
5. **Proceed to next step:** Move to next folder after validation passes

### **Step-by-Step Process:**

```bash
# Step 1: Entities
cd 01-step-entities/
# Use entity-generation-config.ts + entity-generation-prompt.md
# Validate: npm run build

# Step 2: DTOs  
cd ../02-step-dtos/
# Use dto-generation-config.ts + dto-generation-prompt.md
# Validate: npm run build

# Step 3: Services
cd ../03-step-services/
# Use services-generation-config.ts + services-generation-prompt.md  
# Validate: npm run build && npm run start:dev

# Step 4: Authentication
cd ../04-auth/
# Use auth-generation-config.ts + auth-generation-prompt.md
# Validate: Test auth endpoints

# Step 5: Controllers
cd ../05-controllers/
# Use controllers-generation-config.ts + controllers-generation-prompt.md
# Validate: Check Swagger documentation

# Step 6: App Configuration
cd ../06-step-app-config/
# Use app-config-generation-config.ts + app-config-generation-prompt.md
# Validate: Full system integration test
```

## 📋 **Advantages of Step-Specific Approach**

- **Focused Context:** Each step has targeted configurations without information overload
- **Better Organization:** Clear separation of concerns with dedicated artifacts
- **Easier Debugging:** Issues can be isolated to specific generation steps  
- **Iterative Development:** Steps can be repeated individually if needed
- **Clearer Documentation:** Step-specific prompts are more detailed and actionable

## 🔧 **Configuration References**

**Core Reference:**
- `business-rules-reference.md` - Business rules implementation reference (UR-001, WR-001, etc.)

**Step-Specific:** Each step folder contains its own configuration and prompt files for focused generation.

## ✅ **Final Validation**

After completing all steps, run comprehensive validation:

```bash
# Build and start application
npm run build && npm run start:dev

# Test complete user flow
curl -X POST http://localhost:3000/auth/signup -H "Content-Type: application/json" -d '{"username":"test","email":"test@example.com","password":"testpass123"}'

# Verify API documentation
curl http://localhost:3000/api
```

---

**Migration Note:** The original consolidated prompts have been superseded by the step-specific approach for improved clarity and maintainability. 