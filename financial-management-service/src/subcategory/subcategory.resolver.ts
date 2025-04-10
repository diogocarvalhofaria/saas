import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { DefaultMessage } from '../cummons/default-message';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory)
  async createSubcategory(
    @Args('data') data: CreateSubcategoryInput,
  ): Promise<Subcategory> {
    return this.subcategoryService.createSubcategory(data);
  }

  @Query(() => [Subcategory], { name: 'subcategories' })
  async findAllSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryService.findAllSubcategories();
  }

  @Query(() => Subcategory, { name: 'subcategory' })
  async findOneSubcategory(@Args('id') id: string): Promise<Subcategory> {
    return this.subcategoryService.findOneSubcategory(id);
  }

  @Mutation(() => Subcategory)
  async updateSubcategory(
    @Args('data') data: UpdateSubcategoryInput,
  ): Promise<Subcategory> {
    return this.subcategoryService.updateSubcategory(data.id, data);
  }

  @Mutation(() => DefaultMessage)
  async removeSubcategory(@Args('id') id: string): Promise<DefaultMessage> {
    return this.subcategoryService.removeSubcategory(id);
  }
}