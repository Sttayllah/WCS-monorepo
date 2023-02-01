import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blog } from "./blog";
import { Image } from "./image";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  pseudo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Column()
  hashedPassword: string;

  @Column()
  role: string;

  @Field(() => [Image])
  @OneToMany(() => Image, (image) => image.user)
  public images?: Image[];

  @Field(() => Blog)
  @OneToOne(() => Blog, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  blog: Blog;
}
