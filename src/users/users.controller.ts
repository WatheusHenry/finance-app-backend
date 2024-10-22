import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt')) // Protege todas as rotas do controller

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

}
