/**
 * File containing all race queries, mutations and subscriptions
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

import { DocumentType } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import { Types } from 'mongoose';
import { Participant } from '../../models/participant';
import { Race } from '../../models/race';
import RaceSchema from '../../models/race';
import { Rover } from '../../models/rover';
import { User } from '../../models/user';
import { ParticipantInput, RaceInput, UpdateRace } from './resolvers-types';

const pubsub = new PubSub();

const RACE_ADDED = 'RACE_ADDED';
const PARTICIPANT_ADDED = 'RACE_ADDED';

/**
 * Race Queries
 */
const RaceQueries = {
  races: async (parent, args, context) => {
    try {
      const races = await Race.find()
        .populate([{path: 'participants.user', select: 'name email', model: User},
                  {path: 'participants.rover', select: 'name url', model: Rover}])
        .exec();
      return races.map((race) => toPOJO(race));
    } catch (err) {
      throw err;
    }
  },
  raceById: async (parent, args: {raceId: Types.ObjectId}, context) => {
    try {
      const race = await Race.findById(args.raceId)
        .populate([{path: 'participants.user', select: 'name email', model: User},
                  {path: 'participants.rover', select: 'name url', model: Rover}])
        .exec();
      return toPOJO(race);
    } catch (err) {
      throw err;
    }
  },
  raceByTitle: async (parent, args: {title: string}, context) => {
    try {
      const race = await Race.findOne({title: args.title})
        .populate([{path: 'participants.user', select: 'name email', model: User},
                  {path: 'participants.rover', select: 'name url', model: Rover}])
        .exec();
      return toPOJO(race);
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Race Mutations
 */
const RaceMutation = {
  createRace: async (parent: any, args: {raceInput: RaceInput}) => {
    try {
      const race = await Race.findOne({
        title: args.raceInput.title
      });
      if (race) {
        throw new Error('Race already Exists');
      } else {
        const newRace = new Race({
          title: args.raceInput.title,
          participants: []
        });
        const savedRace = await newRace.save();
        const savedRacePOJO = toPOJO(savedRace);
        pubsub.publish(RACE_ADDED, {
          raceAdded: savedRacePOJO
        });
        return savedRacePOJO;
      }
    } catch (error) {
      throw error;
    }
  },
  updateRace: async (parent, args: {updateRace: UpdateRace}, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const race = await Race.findById(args.updateRace.id).exec();
      args.updateRace.participants.forEach((element) => {
        race.participants.push(new Participant({ userId: element.userId, roverId: element.roverId}));
      });
      return toPOJO(race);
    } catch (error) {
      throw error;
    }
  },
  deleteRace: async (parent, args: {raceInput: RaceInput}, context) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
      const race = await Race.findOne({
        title: args.raceInput.title
      });
      if (race) {
        const deletedRace = await Race.findByIdAndDelete(race._id);
        return toPOJO(deletedRace);
      } else {
        throw new Error('Race doesn\'t exist!');
      }
    } catch (error) {
      throw error;
    }
  },
  addParticipant: async (parent, args: {raceId: Types.ObjectId, participantInput: ParticipantInput}, context) => {
    // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
      const findExistingUser = await Race.findById(args.raceId).populate([{path: 'participants.user',
                                    match: {_id: args.participantInput.userId}}]).exec();
      if (findExistingUser.participants.length > 0) {
        throw new Error('User already assigned!');
      }
      const findExistingRover = await Race.findById(args.raceId).populate([{path: 'participants.rover',
                                    match: {_id: args.participantInput.roverId}}]).exec();
      if (findExistingRover.participants.length > 0) {
        throw new Error('Rover already assigned!');
      }

      const participant = new Participant({user: args.participantInput.userId,
                                          rover: args.participantInput.roverId});

      const raceUpdated = await Race.findByIdAndUpdate(args.raceId, {$push: {participants: participant}}, {new: true})
        .populate([{path: 'participants.user', select: 'name email', model: User},
                  {path: 'participants.rover', select: 'name url', model: Rover}])
        .exec();
      pubsub.publish(PARTICIPANT_ADDED, {
        participantAdded: participant
      });
      return toPOJO(raceUpdated);
    } catch (error) {
      throw error;
    }
  }
};

function toPOJO(race: DocumentType<RaceSchema>) {
  const racePOJO = race.toObject();
  racePOJO.participants = racePOJO.participants.map((p) => {
    return { user: p[0].user[0], rover: p[0].rover[0] };
  });
  return racePOJO;
}

/**
 * Race Subscriptions
 */
const RaceSubscription = {
  raceAdded: {
    subscribe: () => pubsub.asyncIterator([RACE_ADDED])
  },
  participantAdded: {
    subscribe: () => pubsub.asyncIterator([PARTICIPANT_ADDED])
  }
};

export { RaceQueries, RaceMutation, RaceSubscription };
