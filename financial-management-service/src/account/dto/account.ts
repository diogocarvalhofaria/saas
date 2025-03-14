import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType() // Decorando a classe com @ObjectType
export class Account {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  value: number;
}
