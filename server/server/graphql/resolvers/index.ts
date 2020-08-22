/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { RaceMutation, RaceQueries, RaceSubscription } from './race';
import { RoverMutation, RoverQueries, RoverSubscription } from './rover';
import { UserMutation, UserQueries, UserSubscription } from './user';

const rootResolver = {
  Query: {
    ...UserQueries,
    ...RoverQueries,
    ...RaceQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...RoverMutation,
    ...RaceMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...RoverSubscription,
    ...RaceSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;
