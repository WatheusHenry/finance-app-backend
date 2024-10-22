import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: '20.206.249.227', 
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'finance_db', 
      entities: [User], 
      synchronize: true, 
      logging: true, 

    }),
    ConfigModule.forRoot(),
    UsersModule, AuthModule, TransactionModule, CategoriesModule
  ], controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
