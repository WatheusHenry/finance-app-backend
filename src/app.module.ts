import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [],

})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou 'mysql', 'sqlite', etc.
      host: 'localhost', // Endereço do banco
      port: 5432, // Porta do banco (ajuste conforme necessário)
      username: 'user', // Usuário do banco
      password: 'password', // Senha do banco
      database: 'finance_db', // Nome do banco de dados
      entities: [User], // Importar entidades
      synchronize: true, // Sincroniza automaticamente as mudanças de entidades no banco (desabilite em produção)
    }),
    UsersModule, AuthModule, TransactionModule, CategoriesModule
  ], controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
