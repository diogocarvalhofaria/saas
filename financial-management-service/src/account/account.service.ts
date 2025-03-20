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


  async createAccount(data: CreateAccountInput): Promise<Category> {
    const account = this.Repository.create(data);
    const accountSaved = await this.Repository.save(account);

    if (!accountSaved) {
      throw new InternalServerErrorException('Account already exists');
    }

    return accountSaved;
  }

  async findAllAccount(): Promise<Category[]> {
    return await this.Repository.createQueryBuilder('account').getMany();
  }

  async findAllAccountWithDeleted(): Promise<Category[]> {
    return await this.Repository.createQueryBuilder('account').withDeleted().getMany();
  }

  async findAccountById(id: string) {
    const account = await this.Repository.createQueryBuilder('account')
      .where('id = :id', { id: id })
      .getOne();
    if (!account)
      throw new InternalServerErrorException('Account not found');
    return account;
  }

  async updateAccount(id: string, data: UpdateAccountInput): Promise<Category> {
    const account = await this.findAccountById(id);
    if (!account) {
      throw new InternalServerErrorException('Account not found');
    }
    await this.Repository.update(account.id, data);
    return this.findAccountById(id);
  }

  async removeAccount(id: string): Promise<DefaultMessage> {
    const account = await this.findAccountById(id);
    const deleted = await this.Repository.softRemove(account);

    return new DefaultMessage(200, 'Removed account');
  }
}
