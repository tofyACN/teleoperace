/**
 * File containing all score queries, mutations and subscriptions
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { getModelForClass } from '@typegoose/typegoose';
import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import ScoreSchema from '../../models/score';
import { transformDocument } from './merge';

const Score = getModelForClass(ScoreSchema);

const pubsub = new PubSub();

const SCORE_ADDED = 'SCORE_ADDED';

/**
 * Score Queries
 */
const ScoreQueries = {
  scores: async (parent: any, args: any, context: any) => {
    try {
      const scores = await Score.find();
      return scores.map((score) => {
        return transformDocument(score);
      });
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Score Mutations
 */
const ScoreMutation = {
  createScore: async (parent: any, { scoreInput }: any) => {
    try {
    /// TODO: Add existence check for score
    //   const score = await Score.findOne({

    //   });
    //   if (score) {
    //     throw new Error('Score already Exists');
    //   } else {
        const newScore = new Score({
          _id: new mongoose.Types.ObjectId(),
          participant: scoreInput.participant,
          race: scoreInput.race,
          score: scoreInput.score
        });
        const savedScore = await newScore.save();
        pubsub.publish(SCORE_ADDED, {
          scoreAdded: transformDocument(savedScore)
        });
        return savedScore;
    //   }
    } catch (error) {
      throw error;
    }
  },
  updateScore: async (parent: any, { scoreId, updateScore }: any, context: { isAuth: any; }) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Non Authenticated');
    }
    try {
      const score = await Score.findByIdAndUpdate(scoreId, updateScore, {
        new: true
      });
      return transformDocument(score);
    } catch (error) {
      throw error;
    }
  },
  deleteScore: async (parent: any, $id: mongoose.Types.ObjectId, context: any) => {
    // // If not authenticated throw error
    // if (!context.isAuth) {
    //   throw new Error('Non Authenticated');
    // }
    try {
        const deletedScore = await Score.findByIdAndDelete($id);
        return transformDocument(deletedScore);
    } catch (error) {
      throw error;
    }
  }

};

/**
 * Score Subscriptions
 */
const ScoreSubscription = {
  scoreAdded: {
    subscribe: () => pubsub.asyncIterator([SCORE_ADDED])
  }
};

export { ScoreQueries, ScoreMutation, ScoreSubscription };
