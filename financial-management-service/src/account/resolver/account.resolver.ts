import { AccountService } from '../service/account.service';
import { AccountTable } from '../entity/account.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from '../dto/account';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Query(() => [Account])
  async getAllAccounts(): Promise<Account[]> {
    const accounts = await this.accountService.getAllAccounts();
    return accounts.map(account => this.toAccountType(account)); // Converte a AccountTable para Account
  }

  @Query(() => Account, { nullable: true })
  async getAccountById(@Args('id') id: string): Promise<Account | null> {
    const account = await this.accountService.getById(id);
    return account ? this.toAccountType(account) : null; // Converte a AccountTable para Account
  }

  @Mutation(() => Account)
  async createAccount(@Args('account') account: AccountTable): Promise<Account> {
    const createdAccount = await this.accountService.createAccount(account);
    return this.toAccountType(createdAccount); // Converte a AccountTable para Account
  }

  @Mutation(() => Account)
  async updateAccount(@Args('id') id: string, @Args('account') account: AccountTable): Promise<Account | null> {
    const updatedAccount = await this.accountService.updateAccount(id, account);
    return updatedAccount ? this.toAccountType(updatedAccount) : null; // Converte a AccountTable para Account
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Args('id') id: string): Promise<boolean> {
    await this.accountService.deleteAccount(id);
    return true;
  }

  // Função para converter AccountTable para Account
  private toAccountType(accountTable: AccountTable): Account {
    const account = new Account();
    account.id = accountTable.id;
    account.title = accountTable.title;
    account.subtitle = accountTable.subtitle;
    account.value = accountTable.value;
    return account;
  }
}
