import { Mutation, Query, Resolver } from "type-graphql";
import { Blog } from "../entity/blog";
import dataSource from "../utils";

@Resolver(Blog)
export class BlogResolver {
  // @Query(()=>[Blog])
  // @Mutation(()=> Blog)
  // update blog
  // -content
  // -label
  // -category
  // - when create article- search right blog byId - article.blog = blog
}
