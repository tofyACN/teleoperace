/**
 * File containing all race queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { getModelForClass } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import RaceSchema from '../../models/race';
import { transformDocument } from './merge';

const Race = getModelForClass(RaceSchema);

const pubsub = new PubSub();

const RACE_ADDED = 'RACE_ADDED';

/**
 * Race Queries
 */
const RaceQueries = {
  races: async (parent, args, context) => {
    try {
      const races = await Race.find();
      return races.map((race) => {
        return transformDocument(race);
      });
    } catch (err) {
      throw err;
    }
  }
//   ,
//   race: async (parent, {raceInput}, context) => {
//     try {
//       const race = await Race.findOne({
//         title: raceInput.title
//       });
//       if (race) {
//         return transformDocument(race);
//       } else {
//         throw new Error('Race doesn\'t exist!');
//       }
//     } catch (err) {
//       throw err;
//     }
//   }
};

/**
 * Race Mutations
 */
const RaceMutation = {
  createRace: async (parent: any, { raceInput }: any) => {
    try {
      const race = await Race.findOne({
        title: raceInput.title
      });
      if (race) {
        throw new Error('Race already Exists');
      } else {
        const newRace = new Race({
          _id: new mongoose.Types.ObjectId(),
          title: raceInput.title
        });
        const savedRace = await newRace.save();
        pubsub.publish(RACE_ADDED, {
          raceAdded: transformDocument(savedRace)
        });
        return savedRace;
      }
    } catch (error) {
      throw error;
    }
  },
  updateRace: async (parent, { raceId, updateRace }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const race = await Race.findByIdAndUpdate(raceId, updateRace, {
        new: true
      });
      return transformDocument(race);
    } catch (error) {
      throw error;
    }
  },
  deleteRace: async (parent, { raceInput }, context) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
      const race = await Race.findOne({
        title: raceInput.title
      });
      if (race) {
        const deletedRace = await Race.findByIdAndDelete(race._id);
        return transformDocument(deletedRace);
      } else {
        throw new Error('Race doesn\'t exist!');
      }
    } catch (error) {
      throw error;
    }
  }

};

/**
 * Race Subscriptions
 */
const RaceSubscription = {
  raceAdded: {
    subscribe: () => pubsub.asyncIterator([RACE_ADDED])
  }
};

export { RaceQueries, RaceMutation, RaceSubscription };
