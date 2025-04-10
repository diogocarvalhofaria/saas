import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { DefaultMessage } from '../cummons/default-message';


export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({ where: { title: data.title } });
    if (existingCategory) {
      throw new BadRequestException('Category with this title already exists');
    }
    const category = this.categoryRepository.create(data);
    return await this.categoryRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findAllCategoriesWithDeleted(): Promise<Category[]> {
    return await this.categoryRepository.find({ withDeleted: true });
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, data: UpdateCategoryInput): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, data);
    return await this.categoryRepository.save(category);
  }

  async removeCategory(id: string): Promise<DefaultMessage> {
    const category = await this.findCategoryById(id);
    await this.categoryRepository.softRemove(category);
    return new DefaultMessage(200, 'Category removed successfully');
  }
}