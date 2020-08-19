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
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): User!
    createRover(roverInput: RoverInput): Rover!
    updateRover(userId: ID!, updateRover: RoverInput): Rover!
    deleteRover(roverInput: RoverInput!): Rover!
  }
  type Subscription {
    userAdded: User
    roverAdded: Rover
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  input UpdateUser {
    email: String
    name: String
    password: String
  }
  type Rover {
    _id: ID!
    name: String!
    url: String!
    createdAt: String!
    updatedAt: String!
  }
  input RoverInput {
    name: String!
    url: String!
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
