import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article";

@ObjectType()
@Entity()
export class Tag {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  //TODO verify la relation entre article et tag
  // @Field()
  // @ManyToOne(() => Article, (article) => article.tags)
  // public article: Article;

  // @ManyToMany(() => Article)
  // @JoinTable()
  // categories: Article[];
}
