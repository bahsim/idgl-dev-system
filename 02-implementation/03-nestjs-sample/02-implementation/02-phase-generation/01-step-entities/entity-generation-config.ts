// Entity Generation Index
// Exports all entity specifications for the WishListShare platform

export * from './types';
export { userEntitySpec } from './entities/user-entity';
export { wishEntitySpec } from './entities/wish-entity';
export { wishlistEntitySpec } from './entities/wishlist-entity';
export { offerEntitySpec } from './entities/offer-entity';

// Import for internal use
import { userEntitySpec } from './entities/user-entity';
import { wishEntitySpec } from './entities/wish-entity';
import { wishlistEntitySpec } from './entities/wishlist-entity';
import { offerEntitySpec } from './entities/offer-entity';

// Combined export for backward compatibility
export const entitySpecs = [
  userEntitySpec,
  wishEntitySpec,
  wishlistEntitySpec,
  offerEntitySpec
];

// Re-export for legacy imports
export { entitySpecs as default }; 