import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';

class CreateUserDto {
  login: string;
  password: string;
}

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { user, token } = await this.usersService.createUser(
        createUserDto.login,
        createUserDto.password
      );

      res.setHeader('X-Auth-Token', token);
      res.status(HttpStatus.CREATED).json({
        id: user.id,
        login: user.login
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      });
    }
  }
} 