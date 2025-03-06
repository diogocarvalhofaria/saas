import { Module } from '@nestjs/common';
import { Account } from './accounts/account';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './service/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])], // Certifique-se de importar a entidade
  providers: [AccountService], // Inclua os providers necessários
  exports: [AccountService], // Se precisar acessar de outro módulo
})
export class AccountModule {}
