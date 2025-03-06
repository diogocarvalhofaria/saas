import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { Account } from '../accounts/account';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {
  }

  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return await this.accountService.getAllAccounts();
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<Account | null> {
    return this.accountService.getById(id);
  }

  @Post()
  async createAccount(account: Account): Promise<Account> {
    return this.accountService.createAccount(account);
  }

  @Put(':id')
  async updateAccount(@Param('id')id: string, @Body() account: Account): Promise<Account | null > {
    return this.accountService.updateAccount(id, account);
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string){
    await this.accountService.deleteAccount(id);
  }
}
