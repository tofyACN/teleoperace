/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { RoverMutation, RoverQueries, RoverSubscription } from './rover';
import { UserMutation, UserQueries, UserSubscription } from './user';

const rootResolver = {
  Query: {
    ...UserQueries,
    ...RoverQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...RoverMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...RoverSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;
