/**
 * Primary file for GraphQL Schema
 * @author Anurag Garg <garganurag893@gmail.com>
 */

import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(userId: ID!): User!
    login(email: String!, password: String!): AuthData!
    rovers: [Rover!]!
    rover(roverInput: RoverInput!): Rover!
    races: [Race!]!
    # race: (raceInput: RaceInput!) Race!
    scores: [Score!]!
    participants: [Participant!]!
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): User!

    createRover(roverInput: RoverInput): Rover!
    updateRover(userId: ID!, updateRover: RoverInput): Rover!
    deleteRover(roverInput: RoverInput!): Rover!

    createParticipant(participantInput: ParticipantInput): Participant!
    updateParticipant(userId: ID!, updateParticipant: ParticipantInput): Participant!
    deleteParticipant(participantInput: ParticipantInput!): Participant!

    createRace(raceInput: RaceInput): Race!
    updateRace(userId: ID!, updateRace: RaceInput): Race!
    deleteRace(raceInput: RaceInput!): Race!

    createScore(scoreInput: ScoreInput): Score!
    updateScore(userId: ID!, updateScore: ScoreInput): Score!
    deleteScore(scoreInput: ScoreInput!): Score!
  }
  type Subscription {
    userAdded: User
    roverAdded: Rover
    raceAdded: Race
    participantAdded: Participant
    scoreAdded: Score
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  type Rover {
    _id: ID!
    name: String!
    url: String!
    createdAt: String!
    updatedAt: String!
  }
  type Participant {
    user: User!
    rover: Rover!
  }
  type Race {
    _id: ID!
    title: String!
    plannedStartDate: String
    startDate: String
    plannedEndDate: String
    endDate: String
    participants: [Participant!]
    scores: [Score!]
  }
  type Score {
    _id: ID!
    participant: Participant!
    race: Race!
    score: Int!
  }
  input UserInput {
    email: String
    name: String
    password: String
  }
  input UpdateUser {
    email: String
    name: String
    password: String
  }
  input RoverInput {
    name: String
    url: String
  }
  input RaceInput {
    title: String!
    plannedStartDate: String
    startDate: String
    plannedEndDate: String
    endDate: String
    participants: [ParticipantInput!]
    scores: [ScoreInput!]
  }
  input ScoreInput {
    participant: ParticipantInput
    race: RaceInput
    score: Int
  }
  input ParticipantInput {
    user: UserInput!
    rover: RoverInput!
  }
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  // introspection: true,
  context: async ({ req, connection, payload }: any) => {
    if (connection) {
      return { isAuth: payload.authToken };
    }
    return { isAuth: req.isAuth };
  }
  // ,playground: true
};

export default schema;
