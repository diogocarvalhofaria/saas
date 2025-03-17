import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Category } from './entities/category.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { DefaultMessage } from '../cummons/default-message';

@Resolver(() => Category)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => Category)
  async createAccount(@Args('data') data: CreateAccountInput) {
    return this.accountService.create(data);
  }

  @Query(() => [Category], { name: 'accounts' })
  async findAll() {
    return this.accountService.findAll();
  }

  @Query(() => [Category], { name: 'accountsWithDeleted' })
  async findAllWithDeleted() {
    return this.accountService.findAllWithDeleted();
  }

  @Query(() => Category, { name: 'account' })
  async findOne(@Args('id') id: string) {
    return this.accountService.findById(id)
  }

  @Mutation(() => Category)
  async updateAccount(@Args('data') data: UpdateAccountInput): Promise<Category> {
        return this.accountService.update(data.id, data);
  }

  @Mutation(() => DefaultMessage)
  async removeAccount(@Args('id') id: string): Promise<DefaultMessage> {
     return await this.accountService.remove(id);
  }
}
