import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../entity/image";
import { User } from "../entity/user";
import dataSource from "../utils";

@Resolver(Image)
export class ImageResolver {
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
        throw new Error("User not found");
      }

      const newImage = new Image();
      newImage.url = imageUrl;
      newImage.user = userFromDB;
      await dataSource.manager.save(newImage);

      return newImage;
    } catch (err: any) {
      console.log("ERRROR ", err.message);
      throw new Error("Failed to add image");
    }
  }
}