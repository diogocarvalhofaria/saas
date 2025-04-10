import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../account/entities/category.entity';

@ObjectType()
@Entity()
export class Subcategory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Field()
  @Column("decimal", { precision: 9, scale: 2, nullable: true })
  value: number;

  @ManyToOne(() => Category, (category) => category.subcategories, { onDelete: 'CASCADE' })
  @Field(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field()
  @CreateDateColumn()
  CreatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;
}
