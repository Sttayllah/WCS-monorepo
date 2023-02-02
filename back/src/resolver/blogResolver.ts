import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Blog } from "../entity/blog";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Blog)
export class BlogResolver {
  @Authorized()
  @Query(() => [Blog])
  async getAllBlogs(): Promise<Blog[]> {
    try {
      return await dataSource.manager.find(Blog);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // @Authorized()
  // @Query(() => Blog)
  // async getOneBlog(@Arg("label") label: string): Promise<Blog> {
  //   try {
  //     const blogFromDB = await dataSource.manager.findOneOrFail(Blog, {
  //       where: { label },
  //     });

  //     const userIdOnBlog = blogFromDB.id;

  //     const userFromDB = await dataSource.manager.findOneOrFail(User, {
  //       where: { id: userIdOnBlog },
  //     });

  //     return blogFromDB;
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error("Invalid query");
  //   }
  // }

  // @Mutation(()=> Blog)

  // update blog
  // -content
  // -label
  // -category
  // - when create article- search right blog byId - article.blog = blog
}
