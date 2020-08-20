/**
 * File containing all participant queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { getModelForClass } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import ParticipantSchema from '../../models/participant';
import { transformDocument } from './merge';

const Participant = getModelForClass(ParticipantSchema);

const pubsub = new PubSub();

const PARTICIPANT_ADDED = 'PARTICIPANT_ADDED';

/**
 * Participant Queries
 */
const ParticipantQueries = {
  participants: async (parent, args, context) => {
    try {
      const participants = await Participant.find();
      return participants.map((participant) => {
        return transformDocument(participant);
      });
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Participant Mutations
 */
const ParticipantMutation = {
  createParticipant: async (parent: any, { participantInput }: any) => {
    try {
    /// TODO: add participant existence check
    //   const participant = await Participant.findOne({
    //     name: participantInput.name
    //   });
    //   if (participant) {
    //     throw new Error('Participant already Exists');
    //   } else {
        const newParticipant = new Participant({
          _id: new mongoose.Types.ObjectId(),
          name: participantInput.name,
          url: participantInput.url
        });
        const savedParticipant = await newParticipant.save();
        pubsub.publish(PARTICIPANT_ADDED, {
          participantAdded: transformDocument(savedParticipant)
        });
        return savedParticipant;
    //   }
    } catch (error) {
      throw error;
    }
  },
  updateParticipant: async (parent, { participantId, updateParticipant }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const participant = await Participant.findByIdAndUpdate(participantId, updateParticipant, {
        new: true
      });
      return transformDocument(participant);
    } catch (error) {
      throw error;
    }
  },
  deleteParticipant: async (parent, $id: mongoose.Types.ObjectId, context) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
        const deletedParticipant = await Participant.findByIdAndDelete($id);
        return transformDocument(deletedParticipant);
    } catch (error) {
      throw error;
    }
  }

};

/**
 * Participant Subscriptions
 */
const ParticipantSubscription = {
  participantAdded: {
    subscribe: () => pubsub.asyncIterator([PARTICIPANT_ADDED])
  }
};

export { ParticipantQueries, ParticipantMutation, ParticipantSubscription };
