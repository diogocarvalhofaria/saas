import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultMessage } from '../cummons/default-message';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Category)
    private Repository: Repository<Category>,
  ) {
  }


  async create(data: CreateAccountInput): Promise<Category> {
    const account = this.Repository.create(data);
    const accountSaved = await this.Repository.save(account);

    if (!accountSaved) {
      throw new InternalServerErrorException('Account already exists');
    }

    return accountSaved;
  }

  async findAll():Promise<Category[]> {
    return await this.Repository.createQueryBuilder('account').getMany()
  }

  async findAllWithDeleted(): Promise<Category[]> {
    return await this.Repository.createQueryBuilder('account').withDeleted().getMany()
  }

  async findById(id: string) {
    const account = await this.Repository.createQueryBuilder('account')
      .where('id = :id', { id: id })
      .getOne();
    if (!account)
      throw new InternalServerErrorException('Account not found');
    return account;
  }

  async update(id: string, data: UpdateAccountInput): Promise<Category> {
    const account = await this.findById(id);
    if (!account){
      throw new InternalServerErrorException('Account not found');
    }
    await this.Repository.update(account.id, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<DefaultMessage>{
    const account = await this.findById(id);
    const deleted = await this.Repository.softRemove(account);

    return new DefaultMessage(200, 'Removed account');
  }
}
