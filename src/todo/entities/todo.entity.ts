import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoCategory } from './todo-category.entity';

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => TodoCategory, (category) => category.todos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: TodoCategory;

  @Column()
  categoryId: number;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ default: false })
  @Field(() => Boolean)
  checked: Boolean;
}
