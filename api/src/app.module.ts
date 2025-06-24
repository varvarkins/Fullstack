import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Like } from './entities/like.entity';
import { UsersController } from './controllers/users.controller';
import { LikesController } from './controllers/likes.controller';
import { UsersService } from './services/users.service';
import { LikesService } from './services/likes.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cat-pinterest-api-pg',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'support_lk_db',
      entities: [User, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Like]),
  ],
  controllers: [AppController, UsersController, LikesController],
  providers: [AppService, UsersService, LikesService],
})
export class AppModule {}
