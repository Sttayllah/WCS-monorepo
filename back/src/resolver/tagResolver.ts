import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entity/tag";
import { Article } from "../entity/article";
import dataSource from "../utils";

@Resolver(Tag)
export class TagResolver {
  @Authorized()
  @Mutation(() => Tag)
  async addTag(
    @Arg("label") label: string,
    @Arg("articleId") articleId: number
  ): Promise<Tag> {
    try {
      const articleFromDB = await dataSource.manager.findOneOrFail(Article, {
        where: { id: articleId },
        relations: {
          tags: true,
        },
      });

      if (!articleFromDB) {
        throw new Error("Article not found");
      }

      const newTag = new Tag();
      newTag.label = label;
      await dataSource.manager.save(newTag);

      if (articleFromDB.tags === undefined) {
        const newTagArr: Tag[] = [newTag];
        articleFromDB.tags = newTagArr;
      } else {
        articleFromDB.tags.push(newTag);
      }
      await dataSource.manager.save(articleFromDB);

      return newTag;
    } catch (err: any) {
      console.log("Error ", err.message);
      throw new Error("Failed to add tag");
    }
  }

  @Authorized()
  @Mutation(() => String)
  async removeTagFromArticle(
    @Arg("articleId") articleId: number,
    @Arg("tagId") tagToRemoveId: number
  ): Promise<String> {
    try {
      const articleFromDB = await dataSource.manager.findOneOrFail(Article, {
        where: { id: articleId },
      });

      articleFromDB.tags = articleFromDB.tags.filter((tag) => {
        return tag.id !== tagToRemoveId;
      });

      await dataSource.manager.save(articleFromDB);

      return "Removed tag from article successfully";
    } catch (error: any) {
      throw new Error("Failed to remove tag from article");
    }
  }
}
