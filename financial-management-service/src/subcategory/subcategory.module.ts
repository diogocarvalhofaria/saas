import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryResolver } from './subcategory.resolver';

@Module({
  providers: [SubcategoryResolver, SubcategoryService],
})
export class SubcategoryModule {}
