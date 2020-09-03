/**
 * Primary file for GraphQL Schema
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

import { ApolloServerExpressConfig } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from '../resolvers/index';

const typeDefs = importSchema('server/graphql/schema/teleoperace.graphql');

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
