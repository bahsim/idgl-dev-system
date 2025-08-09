// Controller Generation Configuration - Step 5
// REST API controllers with proper guards, validation, and Swagger documentation

import { userControllerSpec } from './controllers/user-controller';
import { wishControllerSpec } from './controllers/wish-controller';
import { wishlistControllerSpec } from './controllers/wishlist-controller';
import { offerControllerSpec } from './controllers/offer-controller';

export const controllerSpecs = [
  userControllerSpec,
  wishControllerSpec,
  wishlistControllerSpec,
  offerControllerSpec
];

// Re-export types for external consumption
export * from './types';

// Re-export individual controller specs for external consumption
export { userControllerSpec } from './controllers/user-controller';
export { wishControllerSpec } from './controllers/wish-controller';
export { wishlistControllerSpec } from './controllers/wishlist-controller';
export { offerControllerSpec } from './controllers/offer-controller'; 