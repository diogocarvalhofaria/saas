import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { DefaultMessage } from '../cummons/default-message';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryInput): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Query(() => [Category], { name: 'categoriesIncludingDeleted' })
  async findAllCategoriesIncludingDeleted(): Promise<Category[]> {
    return this.categoryService.findAllCategoriesWithDeleted();
  }

  @Query(() => Category, { name: 'category' })
  async findCategory(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('data') data: UpdateCategoryInput): Promise<Category> {
    return this.categoryService.updateCategory(data.id, data);
  }

  @Mutation(() => DefaultMessage)
  async removeCategory(@Args('id') id: string): Promise<DefaultMessage> {
    return this.categoryService.removeCategory(id);
  }
}