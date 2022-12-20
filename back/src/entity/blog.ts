import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category';
import { Article } from './article';

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
  @Column()
  createdAt: string;

  @Field()
  @Column()
  content: string;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.blogAndUserId)
  articles: Article[];

  @Field()
  @ManyToOne(() => Category, (category) => category.blogs)
  public category: Category;
}
