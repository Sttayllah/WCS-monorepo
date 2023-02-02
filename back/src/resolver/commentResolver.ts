import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Article } from "../entity/article";
import { Comment } from "../entity/comment";
import dataSource from "../utils";

@Resolver(Comment)
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async addComment(
    @Arg("comment") comment: string,
    @Arg("articleId") articleId: number
  ): Promise<Comment> {
    try {
      const articleFromDB = await dataSource.manager.findOneOrFail(Article, {
        where: { id: articleId },
      });

      if (!articleFromDB) {
        throw new Error("Article not found");
      }

      const newComment = new Comment();

      newComment.content = comment;
      newComment.article = articleFromDB;

      await dataSource.manager.save(newComment);

      return newComment;
    } catch (err: any) {
      console.log("Error ", err.message);
      throw new Error("Failed to add comment");
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deleteComment(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(Comment, id);

      return "Deleted Comment successfully";
    } catch (error: any) {
      throw new Error("Failed to delete comment");
    }
  }
}
