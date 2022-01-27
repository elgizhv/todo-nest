import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String!)
  content: string;

  @Field(() => ID!)
  categoryId: number;
}
