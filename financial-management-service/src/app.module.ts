import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AccountController } from './account/controller/account.controller';
import { AccountService } from './account/service/account.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/accounts/account';

@Module({
  imports: [

      TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'mestre',
      database: 'account',
      entities: [Account],
      synchronize: true,
    }),

    AccountModule
  ],


  controllers: [AppController, AccountController, AccountService, AccountModule],
  providers: [AppService, AccountService],
})
export class AppModule {}
