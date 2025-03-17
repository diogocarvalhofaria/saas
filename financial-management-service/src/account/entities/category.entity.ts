import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';

@ObjectType()
@Entity()
export class Category {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  @Field(() => [Subcategory], { nullable: true })
  subcategories: Subcategory[];

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  DeletedAt: Date;

  @Field(() => Date)
  @CreateDateColumn()
  CreatedAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}

