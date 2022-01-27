import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoCategoryInput {
  @Field(() => String)
  title: string;
}
