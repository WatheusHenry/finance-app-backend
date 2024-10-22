// src/transaction/transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const category = await this.categoriesRepository.findOne({
      where: { id: createTransactionDto.categoryId },
    });

    const user = await this.userRepository.findOne({
      where: { id: createTransactionDto.userId }
    })

    if (!category) {
      throw new Error('Category not found');
    }

    if (!user) {
      throw new Error('Category not found');
    }

    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      category,
      user,
    });

    return this.transactionsRepository.save(transaction);
  }

  async findAll(userId: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['category'], // Relaciona com a categoria
    });
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: { id },
      relations: ['category'], // Relaciona com a categoria
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const category = await this.categoriesRepository.findOne({
      where: { id: updateTransactionDto.categoryId },
    });
    await this.transactionsRepository.update(id, { ...updateTransactionDto, category });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
