import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTable } from '../entity/account.entity';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountTable)
    private readonly accountRepository: Repository<AccountTable>,
  ) {
  }

  async getAllAccounts() {
    return await this.accountRepository.find();
  }

  async getById(id: string) {
    const idAccount = String(id);
    return await this.accountRepository.findOne({ where: { id: idAccount } });
  }

  async createAccount(account: AccountTable): Promise<AccountTable> {
    const createdAccount = await this.accountRepository.create(account);
    return this.accountRepository.save(createdAccount);
  }

  async updateAccount(id: string, account: AccountTable) {
    await this.accountRepository.update(id, account);
    return this.getById(id);
  }

  async deleteAccount(id: string) {
    return this.accountRepository.delete(id);
  }

}
