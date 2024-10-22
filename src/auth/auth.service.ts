import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Biblioteca para hash de senhas
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

  ) { }


  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, senha, nome } = createUserDto;

    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Usuário já registrado com esse e-mail');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const newUser = await this.usersService.create({
      email,
      senha: hashedPassword,
      nome,
    });

    return { message: 'Usuário registrado com sucesso', user: newUser };
  }
}
