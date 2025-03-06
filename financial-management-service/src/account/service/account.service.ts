import { Inject, Injectable } from '@nestjs/common';
import { AccountTable } from '../entity/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../accounts/account';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

  constructor(  @InjectRepository(Account)
                private readonly accountRepository: Repository<Account>) {
  }

  async getAllAccounts() {
    return await this.accountRepository.find();
  }

  async getById(id: string) {
    const idAccount = String(id);
    return await this.accountRepository.findOne({where: {id: idAccount}});
  }

  async createAccount(account: Account): Promise<Account> {
    const createdAccount = await this.accountRepository.create(account);
    return this.accountRepository.save(createdAccount);
  }

  async updateAccount(id: string, account: Account) {
    await this.accountRepository.update(id, account);
    return this.getById(id);
  }

  async deleteAccount(id: string){
    return this.accountRepository.delete(id);
  }

}
