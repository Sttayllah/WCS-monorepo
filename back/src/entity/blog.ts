import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Category } from "./category";
import { Article } from "./article";

@ObjectType()
@Entity()
export class Blog {
  @Field()
  @PrimaryGeneratedColumn() // uid
  id: number;

  @Field()
  @Column()
  label: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  content: string;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.blog)
  articles: Article[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.blogs)
  public category: Category;
}
