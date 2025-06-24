import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(login: string, password: string): Promise<{ user: User; token: string }> {
    const existingUser = await this.usersRepository.findOne({ where: { login } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User();
    user.login = login;
    user.password = password;
    
    // Генерируем токен как sha256(user_id + secret_salt)
    const secretSalt = 'cat_pinterest_secret_salt_2024';
    const token = crypto.createHash('sha256').update(`${user.id}${secretSalt}`).digest('hex');
    user.authToken = token;

    const savedUser = await this.usersRepository.save(user);
    
    // Обновляем токен с правильным ID
    const finalToken = crypto.createHash('sha256').update(`${savedUser.id}${secretSalt}`).digest('hex');
    savedUser.authToken = finalToken;
    await this.usersRepository.save(savedUser);

    return { user: savedUser, token: finalToken };
  }

  async findByToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { authToken: token } });
  }
} 