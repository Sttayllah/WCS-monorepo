import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../entity/image";
import dataSource from "../utils";

@Resolver(Image)
export class ImageResolver {
  //   @Authorized()
  //   @Query(() => [Image])
  //   async getAllImages(): Promise<Wilder[]> {
  //     return await dataSource.manager.find(Wilder, {
  //       relations: {
  //         grades: {
  //           skill: true,
  //         },
  //       },
  //     });
  //   }

  @Authorized()
  @Mutation(() => Image)
  async addImage(
    @Arg("email") email: string,
    @Arg("imageUrl") imageUrl: string
  ): Promise<Image> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        email,
      });
      if (!userFromDB) {
        throw new Error("Image not found");
      }

      const newImage = new Image();
      newImage.url = email;

      return newImage;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update images");
    }
  }
}
