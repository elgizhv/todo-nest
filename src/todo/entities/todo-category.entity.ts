import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
@ObjectType()
export class TodoCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToMany(() => Todo, (todo) => todo.category)
  @Field(() => [Todo])
  todos: Todo[];

  @Column()
  @Field(() => String)
  title: string;
}
