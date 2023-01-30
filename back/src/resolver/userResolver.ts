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
          user: {
            pseudo: userFromDB.pseudo,
            email: userFromDB.email,
            avatar: userFromDB.avatar,
            description: userFromDB.description,
          },
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
        images: userFromDB.images || undefined,
      };
      return queryUser;
    } catch (err) {
      console.log(err);
      throw new Error("Invalid query");
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("pseudo") pseudo: string,
    @Arg("description") description?: string,
    @Arg("avatar") avatar?: string
  ): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.description = description;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = "USER";
    newUser.images = [];
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log("USER SAVED:", userFromDB);
    return userFromDB;
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("email") email: string,
    @Arg("pseudo") pseudo: string,
    @Arg("description") description: string,
    @Arg("avatar") avatar: string
  ): Promise<User> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        email,
      });
      if (!userFromDB) {
        throw new Error("User not found");
      }
      userFromDB.description = description;
      userFromDB.pseudo = pseudo;
      userFromDB.avatar = avatar;
      const updatedUser = await dataSource.manager.save(User, userFromDB);
      return updatedUser;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update user");
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUser(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(User, id);
      return "Deleted user successfully";
    } catch (error: any) {
      throw new Error("Failed to delete user");
    }
  }
}
