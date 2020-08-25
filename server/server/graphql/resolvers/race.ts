/**
 * File containing all race queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import ParticipantSchema from '../../models/participant';
import RaceSchema from '../../models/race';
import RoverSchema from '../../models/rover';
import UserSchema from '../../models/user';

const Race = getModelForClass(RaceSchema);
const User = getModelForClass(UserSchema);
const Rover = getModelForClass(RoverSchema);
const Participant = getModelForClass(ParticipantSchema);

const pubsub = new PubSub();

const RACE_ADDED = 'RACE_ADDED';
const PARTICIPANT_ADDED = 'RACE_ADDED';

/**
 * Race Queries
 */
const RaceQueries = {
  races: async (parent, args, context) => {
    try {
      const races = await Race.find().
                              populate([{path: 'participants.user', model: User},
                                        {path: 'participants.rover', model: Rover}]).
                              exec();
      return races.map((race) => toPOJO(race));
    } catch (err) {
      throw err;
    }
  }
  // ,
  // race: async (parent, {$title}, context) => {
  //   try {
  //     const race = await Race.findOne({
  //       title: $title
  //     });
  //     if (race) {
  //       return toPOJO(race);
  //     } else {
  //       throw new Error('Race doesn\'t exist!');
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }
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
          title: raceInput.title,
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
  updateRace: async (parent, { raceId, updateRace }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const race = await Race.findByIdAndUpdate(raceId, updateRace, {
        new: true
      });
      return toPOJO(race);
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
        return toPOJO(deletedRace);
      } else {
        throw new Error('Race doesn\'t exist!');
      }
    } catch (error) {
      throw error;
    }
  },
  addParticipant: async (parent, { raceId, participantInput }, context) => {
    // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
      let race = await Race.findById(raceId).populate([{path: 'participants.user', model: User}, {path: 'participants.rover', model: Rover}]).exec();
      if (race.participants.find((p) => p.user === participantInput.userId)) {
        throw new Error('User already assigned!');
      }
      if (race.participants.find((p) => p.rover === participantInput.roverId)) {
        throw new Error('Rover already assigned!');
      }
      const participant = new Participant({user: participantInput.userId, rover: participantInput.roverId});

      race = await Race.findByIdAndUpdate(raceId,
          {$push: {participants: participant}}).exec();

      await race.populate([{path: 'participants.user', model: User, select: 'name email'},
                          {path: 'participants.rover', model: Rover, select: 'name url'}]).
                          execPopulate();
      return toPOJO(race);

      // return race;
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
