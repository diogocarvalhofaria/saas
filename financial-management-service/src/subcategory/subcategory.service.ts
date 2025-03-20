import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultMessage } from '../cummons/default-message';

@Injectable()
export class SubcategoryService {

  constructor(
    @InjectRepository(Subcategory)
    private Repository: Repository<Subcategory>) {
  }

  async createSubcategory(data: CreateSubcategoryInput) {
    try {
      const subcategory = this.Repository.create(data);
      const subcategorySaved = await this.Repository.save(subcategory);

      return new DefaultMessage(200, 'Create Subcategory');
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAllSubcategory() {
    try {
      return await this.Repository.createQueryBuilder('subcategory').getMany();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findOneCategory(id: string) {
    try {

      return await this.Repository.findOneBy({ id });

    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateSubcategory(id: string, data: UpdateSubcategoryInput) {
    try {
      const subcategory = await this.findOneCategory(id);

      if (!subcategory) {
        throw new BadRequestException('Subcategory not found');
      }
      await this.Repository.update(subcategory.id, data);

      return new DefaultMessage(200, 'Subcategory updated successfully.');

    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async removeSubcategory(id: string) {
    try {

      const subcategory = await this.findOneCategory(id);


      if (!subcategory) {
        throw new BadRequestException('Subcategory not found');
      }

      await this.Repository.softRemove(subcategory);

      return new DefaultMessage(200, 'Removed subcategory');

    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
