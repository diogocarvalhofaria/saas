import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory)
  createSubcategory(@Args('createSubcategoryInput') createSubcategoryInput: CreateSubcategoryInput) {
    return this.subcategoryService.createSubcategory(createSubcategoryInput);
  }

  @Query(() => [Subcategory], { name: 'subcategory' })
  findAllSubcategory() {
    return this.subcategoryService.findAllSubcategory();
  }

  @Query(() => Subcategory, { name: 'subcategory' })
  findOneCategory(@Args('id', { type: () => Int }) id: string) {
    return this.subcategoryService.findOneCategory(id);
  }

  @Mutation(() => Subcategory)
  updateSubcategory(@Args('data') data: UpdateSubcategoryInput) {
    return this.subcategoryService.updateSubcategory(data.id, data);
  }

  @Mutation(() => Subcategory)
  removeSubcategory(@Args('id', { type: () => Int }) id: string) {
    return this.subcategoryService.removeSubcategory(id);
  }
}
