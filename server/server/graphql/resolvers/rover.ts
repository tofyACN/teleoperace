/**
 * File containing all rover queries, mutations and subscriptions
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

import { PubSub } from 'apollo-server';
import { RoverInput, UpdateRover} from '../../graphql/resolvers/resolvers-types';
import {Rover} from '../../models/rover';
import { transformDocument } from './merge';

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
  rover: async (parent, args: {roverInput: RoverInput}) => {
    try {
      const rover = await Rover.findOne({
        name: args.roverInput.name
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
  createRover: async (parent: any, args: {roverInput: RoverInput}) => {
    try {
      const rover = await Rover.findOne({
        name: args.roverInput.name
      });
      if (rover) {
        throw new Error('Rover already Exists');
      } else {
        const newRover = new Rover({
          name: args.roverInput.name,
          url: args.roverInput.url
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
  updateRover: async (parent, updateRover: UpdateRover, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const rover = await Rover.findByIdAndUpdate(updateRover.id, updateRover, {
        new: true
      });
      return transformDocument(rover);
    } catch (error) {
      throw error;
    }
  },
  deleteRover: async (parent, args: {roverInput: RoverInput}) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Not Authenticated');
    // }
    try {
      const rover = await Rover.findOne({
        name: args.roverInput.name
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
