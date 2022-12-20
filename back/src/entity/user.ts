import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
