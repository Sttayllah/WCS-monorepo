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
import { Category } from "../entity/category";
import { Blog } from "../entity/blog";

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
  async getOneUser(@Arg("email") email: string): Promise<User> {
    try {
      const userFromDB = await dataSource.manager.findOneOrFail(User, {
        where: { email },
        relations: {
          images: true,
          blog: {
            articles: {
              comments: true,
              tags: true,
            },
            category: true,
          },
        },
      });

      console.log("=>>>>>USERFROMDB", userFromDB);
      return userFromDB;
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
    @Arg("description", { nullable: true }) description?: string,
    @Arg("avatar", { nullable: true }) avatar?: string
  ): Promise<User> {
    const defaultCategory = await dataSource.manager.findOneOrFail(Category, {
      where: {
        label: "diverse",
      },
    });

    const newBlog = new Blog();
    newBlog.category = defaultCategory;
    newBlog.label = "";
    newBlog.content = "";

    const saveBlog = await dataSource.manager.save(Blog, newBlog);

    const newUser = new User();
    newUser.email = email;
    newUser.description = description;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = "USER";
    newUser.blog = newBlog;

    //make sure relations (blog, images) are sent as well?
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
