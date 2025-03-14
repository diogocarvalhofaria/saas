import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './service/account.service';
import { AccountTable } from './entity/account.entity';
import { AccountController } from './controller/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTable])],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService, TypeOrmModule],
})
export class AccountModule {}
