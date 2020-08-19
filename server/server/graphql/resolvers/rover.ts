/**
 * File containing all rover queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { getModelForClass } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import RoverSchema from '../../models/rover';
import { transformDocument } from './merge';

const Rover = getModelForClass(RoverSchema);

const pubsub = new PubSub();

const ROVER_ADDED = 'ROVER_ADDED';

/**
 * Rover Queries
 */
const RoverQueries = {
  rovers: async (parent, args, context) => {
    try {
      const rovers = await Rover.find();
      return rovers.map((rover) => {
        return transformDocument(rover);
      });
    } catch (err) {
      throw err;
    }
  },
  rover: async (parent, { roverInput }) => {
    try {
      const rover = await Rover.findOne({
        name: roverInput.name
      });
      if (rover) {
        return transformDocument(rover);
      } else {
        throw new Error('Rover doesn\'t exist!');
      }
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Rover Mutations
 */
const RoverMutation = {
  createRover: async (parent: any, { roverInput }: any) => {
    try {
      const rover = await Rover.findOne({
        name: roverInput.name
      });
      if (rover) {
        throw new Error('Rover already Exists');
      } else {
        const newRover = new Rover({
          _id: new mongoose.Types.ObjectId(),
          name: roverInput.name,
          url: roverInput.url
        });
        const savedRover = await newRover.save();
        pubsub.publish(ROVER_ADDED, {
          roverAdded: transformDocument(savedRover)
        });
        return savedRover;
      }
    } catch (error) {
      throw error;
    }
  },
  updateRover: async (parent, { roverId, updateRover }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const rover = await Rover.findByIdAndUpdate(roverId, updateRover, {
        new: true
      });
      return transformDocument(rover);
    } catch (error) {
      throw error;
    }
  },
  deleteRover: async (parent, { roverInput }, context) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
      const rover = await Rover.findOne({
        name: roverInput.name
      });
      if (rover) {
        const deletedRover = await Rover.findByIdAndDelete(rover._id);
        return transformDocument(deletedRover);
      } else {
        throw new Error('Rover doesn\'t exist!');
      }
    } catch (error) {
      throw error;
    }
  }

};

/**
 * Rover Subscriptions
 */
const RoverSubscription = {
  roverAdded: {
    subscribe: () => pubsub.asyncIterator([ROVER_ADDED])
  }
};

export { RoverQueries, RoverMutation, RoverSubscription };
