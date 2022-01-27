import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoStateInput {
  @Field(() => Int!)
  id: number;

  @Field(() => Boolean)
  checked: boolean;
}
