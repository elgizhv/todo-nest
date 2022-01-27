import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoCategory } from './entities/todo-category.entity';
import { CreateTodoCategoryInput } from './dto/create-category.input';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoStateInput } from './dto/update-todo-state.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    @InjectRepository(TodoCategory)
    private readonly todoCategoryRepo: Repository<TodoCategory>,
  ) {}

  async findCategories(): Promise<Array<TodoCategory>> {
    return await this.todoCategoryRepo.find();
  }

  async findAllTodos(): Promise<Array<Todo>> {
    return await this.todoRepo.find();
  }

  async findTodosByCategory(categoryId: number): Promise<Array<Todo>> {
    return await this.todoRepo.find({ categoryId });
  }

  async checkCategoryState(categoryId: number): Promise<Boolean> {
    let count = await this.todoRepo.count({ categoryId, checked: false });
    return count == 0;
  }

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const todo = this.todoRepo.create(input);
    return await this.todoRepo.save(todo);
  }
  async updateTodoState(input: UpdateTodoStateInput): Promise<boolean> {
    const { id, checked } = input;
    let result = await this.todoRepo.update({ id }, { checked });
    return result.affected == 1;
  }
  async removeTodo(id: number): Promise<boolean> {
    let result = await this.todoRepo.delete({ id });
    return result.affected == 1;
  }

  async createCategory(input: CreateTodoCategoryInput): Promise<TodoCategory> {
    const category = this.todoCategoryRepo.create(input);
    return await this.todoCategoryRepo.save(category);
  }
  async removeTodoCategory(id: number): Promise<boolean> {
    let result = await this.todoCategoryRepo.delete({ id });
    return result.affected == 1;
  }
}
