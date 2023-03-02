import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Blog } from "../entity/blog";
import { Category } from "../entity/category";
// import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Blog)
export class BlogResolver {
  @Authorized()
  @Query(() => [Blog])
  async getAllBlogs(): Promise<Blog[]> {
    try {
      return await dataSource.manager.find(Blog, {
        relations: {
          category: true,
          articles: {
            comments: true,
            tags: true,
          },
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Blog)
  async updateBlog(
    @Arg("id") id: number,
    @Arg("label", { nullable: true }) label?: string,
    @Arg("content", { nullable: true }) content?: string,
    @Arg("categoryLabel", { nullable: true }) categoryLabel?: string
  ): Promise<Blog> {
    try {
      const blogFromDB = await dataSource.manager.findOneByOrFail(Blog, {
        id,
      });
      if (!blogFromDB) {
        throw new Error("Blog not found");
      }

      if (categoryLabel) {
        let categoryFromDB = await dataSource.manager.findOne(Category, {
          where: { label: categoryLabel },
        });

        if (!categoryFromDB) {
          const newCategory = new Category();

          newCategory.label = categoryLabel;
          categoryFromDB = await dataSource.manager.save(newCategory);
        }
        blogFromDB.category = categoryFromDB;
      }

      if (label) {
        blogFromDB.label = label;
      }

      if (content) {
        blogFromDB.content = content;
      }
      const updatedBlog = await dataSource.manager.save(Blog, blogFromDB);

      return updatedBlog;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update blog");
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
}
