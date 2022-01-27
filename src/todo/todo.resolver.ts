import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoCategory } from './entities/todo-category.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { CreateTodoCategoryInput } from './dto/create-category.input';
import { UpdateTodoStateInput } from './dto/update-todo-state.input';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  todos() {
    return this.todoService.findAllTodos();
  }

  @Query(() => [TodoCategory])
  todoCategories() {
    return this.todoService.findCategories();
  }

  @Mutation(() => Todo)
  createTodo(@Args('input') input: CreateTodoInput) {
    return this.todoService.createTodo(input);
  }

  @Mutation(() => Boolean)
  updateTodoState(@Args('input') input: UpdateTodoStateInput) {
    return this.todoService.updateTodoState(input);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id') id: number) {
    return this.todoService.removeTodo(id);
  }

  @Mutation(() => TodoCategory)
  createCategory(@Args('input') input: CreateTodoCategoryInput) {
    return this.todoService.createCategory(input);
  }
  @Mutation(() => Boolean)
  removeTodoCategory(@Args('id') id: number) {
    return this.todoService.removeTodoCategory(id);
  }
}

@Resolver((of) => TodoCategory)
export class TodoCategoryResolver {
  constructor(private readonly todoService: TodoService) {}

  @ResolveField()
  async todos(@Parent() todoCategory: TodoCategory) {
    const { id } = todoCategory;
    return this.todoService.findTodosByCategory(id);
  }

  @ResolveField(() => Boolean)
  async checkedAll(@Parent() todoCategory: TodoCategory) {
    return await this.todoService.checkCategoryState(todoCategory.id);
  }
}
