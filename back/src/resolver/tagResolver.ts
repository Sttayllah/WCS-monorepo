import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entity/tag";
import { Article } from "../entity/article";
import dataSource from "../utils";

@Resolver(Tag)
export class TagResolver {
  @Authorized()
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    try {
      return await dataSource.manager.find(Tag);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Mutation(() => Tag)
  async createTag(@Arg("label") label: string): Promise<Tag> {
    try {
      const newTag = new Tag();
      newTag.label = label;

      const savedTag = await dataSource.manager.save(Tag, newTag);
      return savedTag;
    } catch (error: any) {
      throw new Error("Failed to remove tag from article");
    }
  }

  @Authorized()
  @Mutation(() => Tag)
  async addTagToArticle(
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

      let tagToAddToArticle = await dataSource.manager.findOne(Tag, {
        where: {
          label,
        },
      });

      if (!tagToAddToArticle) {
        const newTag = new Tag();
        newTag.label = label;
        tagToAddToArticle = await dataSource.manager.save(newTag);
      }

      if (articleFromDB.tags === undefined) {
        const newTagArr: Tag[] = [tagToAddToArticle];
        articleFromDB.tags = newTagArr;
      } else {
        articleFromDB.tags.push(tagToAddToArticle);
      }
      await dataSource.manager.save(articleFromDB);

      return tagToAddToArticle;
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
