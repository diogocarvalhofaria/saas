import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { DefaultMessage } from '../cummons/default-message';
import { Category } from '../account/entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async createSubcategory(data: CreateSubcategoryInput): Promise<Subcategory> {
    const subcategory = this.subcategoryRepository.create({
      ...data,
      category: { id: data.categoryId },
    });
    return await this.subcategoryRepository.save(subcategory);
  }

  async findAllSubcategories(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find({relations: ['category']});
  }

  async findOneSubcategory(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    return subcategory;
  }

  async updateSubcategory(id: string, data: UpdateSubcategoryInput): Promise<Subcategory> {
    const subcategory = await this.findOneSubcategory(id);
    Object.assign(subcategory, data);
    if (data.categoryId) {
      subcategory.category = { id: data.categoryId } as Category;
    }
    return await this.subcategoryRepository.save(subcategory);
  }

  async removeSubcategory(id: string): Promise<DefaultMessage> {
    const subcategory = await this.findOneSubcategory(id);
    await this.subcategoryRepository.softRemove(subcategory);
    return new DefaultMessage(200, 'Subcategory removed successfully');
  }
}