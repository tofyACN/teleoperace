/**
 * Exporting all resolvers
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { ParticipantMutation, ParticipantQueries, ParticipantSubscription } from './participant';
import { RaceMutation, RaceQueries, RaceSubscription } from './race';
import { RoverMutation, RoverQueries, RoverSubscription } from './rover';
import { ScoreMutation, ScoreQueries, ScoreSubscription } from './score';
import { UserMutation, UserQueries, UserSubscription } from './user';

const rootResolver = {
  Query: {
    ...UserQueries,
    ...RoverQueries,
    ...RaceQueries,
    ...ParticipantQueries,
    ...ScoreQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...RoverMutation,
    ...RaceMutation,
    ...ParticipantMutation,
    ...ScoreMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...RoverSubscription,
    ...RaceSubscription,
    ...ParticipantSubscription,
    ...ScoreSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;
