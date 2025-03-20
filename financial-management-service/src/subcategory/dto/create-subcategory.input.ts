import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryInput {

  @Field()
  name: string;

  @Field()
  value: number;

}
