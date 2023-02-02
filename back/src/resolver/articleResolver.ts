import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Blog } from "../entity/blog";
import { Article } from "../entity/article";
import dataSource from "../utils";

@InputType({ description: "update article data" })
class UpdateArticleInput implements Partial<Article> {
  @Field({ nullable: true })
  label?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;
}

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
    @Arg("id") id: number,
    @Arg("data") updateArticleParams: UpdateArticleInput
  ): Promise<Article> {
    try {
      const updatedArticle: Article = await dataSource
        .createQueryBuilder()
        .update(Article)
        .set(updateArticleParams)
        .where("id = :id", { id })
        .returning("*")
        .execute()
        .then((response) => {
          return response.raw[0];
        });

      return updatedArticle;
    } catch (err: any) {
      console.log("ERRROR ", err.message);
      throw new Error("Failed to update article");
    }
  }
}
