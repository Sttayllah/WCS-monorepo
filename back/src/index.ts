import 'reflect-metadata';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolver/userResolver';
import dataSource from './utils';

dotenv.config();

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: ({ context }, roles) => {
      console.log('roles in decorator', roles);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!context.user) {
        return false;
      } else if (roles.length === 0 || roles.includes(context.user.role)) {
        return true;
      } else {
        return false;
      }
    },
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split('Bearer ')[1];
          if (bearer.length > 0) {
            const user = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
            return { user };
          } else {
            return {};
          }
        } catch (err) {
          console.log(err);
          return {};
        }
      }
    },
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log('Error starting the server');
  }
};

void start();
