import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Blog } from "../entity/blog";
import { Article } from "../entity/article";
import dataSource from "../utils";

@Resolver(ArticleResolver)
export class ArticleResolver {
  @Authorized()
  @Mutation(() => Article)
  async addArticle(
    @Arg("label") label: string,
    @Arg("content") content: string,
    @Arg("isPublished") isPublished: boolean,
    @Arg("blogId") blogId: number,
    @Arg("publishedAt", { nullable: true }) publishedAt?: Date
  ): Promise<Article> {
    try {
      const blogFromDB = await dataSource.manager.findOneByOrFail(Blog, {
        id: blogId,
      });
      if (!blogFromDB) {
        throw new Error("Blog not found");
      }

      const newArticle = new Article();
      newArticle.label = label;
      newArticle.content = content;
      newArticle.isPublished = isPublished;
      newArticle.publishedAt = publishedAt;
      newArticle.blog = blogFromDB;
      await dataSource.manager.save(newArticle);

      return newArticle;
    } catch (err: any) {
      console.log("ERRROR ", err.message);
      throw new Error("Failed to add article");
    }
  }

  @Authorized()
  @Mutation(() => Article)
  async updateArticle(
    @Arg("label") label: string,
    @Arg("content") content: string,
    @Arg("isPublished") isPublished: boolean,
    @Arg("publishedAt", { nullable: true }) publishedAt?: Date
  ): Promise<Article> {
    try {
      const newArticle = new Article();
      newArticle.label = label;
      newArticle.content = content;
      newArticle.isPublished = isPublished;
      newArticle.publishedAt = publishedAt;
      await dataSource.manager.save(newArticle);

      return newArticle;
    } catch (err: any) {
      console.log("ERRROR ", err.message);
      throw new Error("Failed to update article");
    }
  }
}
