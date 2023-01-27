import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  @Column()
  description?: string;

  @Field({ nullable: true })
  @Column()
  avatar?: string;

  @Column()
  hashedPassword: string;

  @Column()
  role: string;

  @Field(() => [Image])
  @OneToMany(() => Image, (image) => image.user)
  public images: Image[];
}
