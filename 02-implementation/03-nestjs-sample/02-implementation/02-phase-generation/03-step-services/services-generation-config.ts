// Service Generation Configuration - Step 3
// Business logic services with CRUD operations and business rule enforcement

import { userServiceSpec } from './services/user-service';
import { wishServiceSpec } from './services/wish-service';
import { wishlistServiceSpec } from './services/wishlist-service';
import { offerServiceSpec } from './services/offer-service';

export const serviceSpecs = [
  userServiceSpec,
  wishServiceSpec,
  wishlistServiceSpec,
  offerServiceSpec
];

// Re-export types for external consumption
export * from './types';

// Re-export individual service specs for external consumption
export { userServiceSpec } from './services/user-service';
export { wishServiceSpec } from './services/wish-service';
export { wishlistServiceSpec } from './services/wishlist-service';
export { offerServiceSpec } from './services/offer-service'; 