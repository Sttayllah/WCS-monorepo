import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entity/category";
import dataSource from "../utils";

@Resolver(Category)
export class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    try {
      return await dataSource.manager.find(Category);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Mutation(() => Category)
  async createCategory(@Arg("label") label: string): Promise<Category> {
    const newCategory = new Category();
    newCategory.label = label;

    const categoryFromDB = await dataSource.manager.save(newCategory);
    console.log("Category SAVED:", categoryFromDB);
    return categoryFromDB;
  }
}
