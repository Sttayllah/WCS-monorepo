import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Blog } from "../entity/blog";
import { Category } from "../entity/category";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Blog)
export class BlogResolver {
  @Query(() => [Blog])
  async getAllBlog(): Promise<Blog[]> {
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

  @Mutation(() => Blog)
  async updateBlog(
    @Arg("id") id: number,
    @Arg("label") label: string,
    @Arg("content") content: string,
    @Arg("categoryId") categoryId: number
  ): Promise<Blog> {
    try {
      const blogFromDB = await dataSource.manager.findOneByOrFail(Blog, {
        id,
      });
      if (!blogFromDB) {
        throw new Error("Blog not found");
      }

      const newCategoryFromDB = await dataSource.manager.findOneOrFail(
        Category,
        {
          where: { id: categoryId },
        }
      );

      blogFromDB.content = content;
      blogFromDB.label = label;
      blogFromDB.category = newCategoryFromDB;

      const updatedBlog = await dataSource.manager.save(Blog, blogFromDB);

      return updatedBlog;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update blog");
    }
  }
}
