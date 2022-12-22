import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Field,
  Mutation,
  InputType,
  Query,
  Resolver,
  Authorized,
} from "type-graphql";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
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
        return JSON.stringify({
          token,
          user: { pseudo: userFromDB.pseudo, email: userFromDB.email },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      throw new Error("Invalid Auth");
    }
  }

  @Authorized()
  @Query(() => User)
  async getOne(@Arg("email") email: string): Promise<User> {
    try {
      const userFromDB = await dataSource.getRepository(User).findOneByOrFail({
        email,
      });
      const queryUser: User = {
        id: userFromDB.id,
        email: userFromDB.email,
        pseudo: userFromDB.pseudo,
        hashedPassword: "",
        role: userFromDB.role,
        description: userFromDB.description || undefined,
        avatar: userFromDB.avatar || undefined,
      };
      return queryUser;
    } catch (err) {
      console.log(err);
      throw new Error("Invalid query");
    }
  }

  @Mutation(() => User)
  async createUser(
    // @Arg("data") data: AddUserInput
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("pseudo") pseudo: string,
    @Arg("description") description: string,
    @Arg("avatar") avatar: string
  ): Promise<User> {
    console.log("test");
    // const { email, password, pseudo, description, avatar } = data;

    const newUser = new User();
    newUser.email = email;
    newUser.description = description;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = "USER";
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log("USER SAVED:", userFromDB);
    return userFromDB;
  }
}
