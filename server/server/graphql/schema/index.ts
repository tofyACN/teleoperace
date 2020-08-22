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
    # participants: [Participant!]!
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): User!

    createRover(roverInput: RoverInput): Rover!
    updateRover(userId: ID!, updateRover: RoverInput): Rover!
    deleteRover(roverInput: RoverInput!): Rover!

    createRace(raceInput: RaceInput): Race!
    updateRace(userId: ID!, updateRace: RaceInput): Race!
    deleteRace(raceInput: RaceInput!): Race!
    addParticipant(participantInput: ParticipantInput): Participant!
  }
  type Subscription {
    userAdded: User
    roverAdded: Rover
    raceAdded: Race
    participantAdded: Participant
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
    score: Int!
  }
  type Race {
    _id: ID!
    title: String!
    plannedStartDate: String
    startDate: String
    plannedEndDate: String
    endDate: String
    participants: [Participant!]!
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
  }
  input ParticipantInput {
    userId: ID!
    roverId: ID!
    score: Int
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
