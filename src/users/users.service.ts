import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, nome: string, senha: string): Promise<User> {
    const newUser = this.usersRepository.create({
      email,
      nome,
      senha,
    });
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async validateUserPassword(email: string, senha: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(senha, user.senha)) {
      return user;
    }
    return null;
  }
}
