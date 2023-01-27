import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../entity/image";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Image)
export class ImageResolver {
  @Authorized()
  @Mutation(() => Image)
  async addImage(
    @Arg("id") id: number,
    @Arg("imageUrl") imageUrl: string
  ): Promise<Image> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        id,
      });
      if (!userFromDB) {
        throw new Error("User not found");
      }

      const newImage = new Image();
      newImage.url = imageUrl;
      newImage.user = userFromDB;

      userFromDB.images.push(newImage);
      const updatedUser = await dataSource.manager.save(User, userFromDB);

      return newImage;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to add image");
    }
  }
}
