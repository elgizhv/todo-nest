import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoCategoryResolver, TodoResolver } from './todo.resolver';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCategory } from './entities/todo-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoCategory]),
    TypeOrmModule.forFeature([Todo]),
  ],
  providers: [TodoService, TodoResolver, TodoCategoryResolver],
})
export class TodoModule {}
