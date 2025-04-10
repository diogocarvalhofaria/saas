import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryInput {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  categoryId: string;

}
