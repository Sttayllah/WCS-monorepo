import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Arg, Field, Mutation, InputType, Query, Resolver } from 'type-graphql';
import { User } from '../entity/user';
import dataSource from '../utils';

@InputType({ description: 'New user data' })
class AddUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  pseudo: string;

  @Field()
  description?: string;

  @Field()
  avatar?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async getToken(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        email,
      });
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      if (await argon2.verify(userFromDB.hashedPassword, password)) {
        const token = jwt.sign(
          { email: userFromDB.email, role: userFromDB.role },
          process.env.JWT_SECRET_KEY
        );
        return token;
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      throw new Error('Invalid Auth');
    }
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: AddUserInput): Promise<User> {
    const { email, password, pseudo, description, avatar } = data;
    const newUser = new User();
    newUser.email = email;
    newUser.description = description;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = 'USER';
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log('USER SAVED:', userFromDB);
    return userFromDB;
  }
}
