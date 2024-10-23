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

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, senha } = loginUserDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, senha, nome } = createUserDto;

    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Usuário já registrado com esse e-mail');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await this.usersService.create({
      email,
      senha: hashedPassword,
      nome,
    });

    const payload = { email: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return { message: 'Usuário registrado com sucesso', access_token: token };
  }
}
