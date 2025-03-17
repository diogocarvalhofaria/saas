import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {

  @Field()
  title: string;
}
