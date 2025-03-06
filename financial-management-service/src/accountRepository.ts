import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from './account/accounts/account';

@Injectable()
@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {}
