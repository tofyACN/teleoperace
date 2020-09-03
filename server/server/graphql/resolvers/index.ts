/**
 * Exporting all resolvers
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

import {GraphQLDate} from 'graphql-scalars';
import { RaceMutation, RaceQueries, RaceSubscription } from './race';
import { RoverMutation, RoverQueries, RoverSubscription } from './rover';
import { UserMutation, UserQueries, UserSubscription } from './user';

const rootResolver = {
  Date: GraphQLDate,
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
