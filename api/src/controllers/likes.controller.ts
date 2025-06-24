import { Controller, Get, Post, Delete, Body, Param, Headers, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LikesService } from '../services/likes.service';
import { UsersService } from '../services/users.service';

class CreateLikeDto {
  cat_id: string;
}

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getLikes(@Headers('authorization') authHeader: string, @Res() res: Response) {
    try {
      const token = authHeader?.replace('Bearer ', '');
      if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
      }

      const user = await this.usersService.findByToken(token);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
      }

      const likes = await this.likesService.getLikesByUser(user.id);
      res.json({ data: likes });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post()
  async createLike(@Headers('authorization') authHeader: string, @Body() createLikeDto: CreateLikeDto, @Res() res: Response) {
    try {
      const token = authHeader?.replace('Bearer ', '');
      if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
      }

      const user = await this.usersService.findByToken(token);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
      }

      const like = await this.likesService.createLike(createLikeDto.cat_id, user);
      res.status(HttpStatus.CREATED).json(like);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':cat_id')
  async deleteLike(@Headers('authorization') authHeader: string, @Param('cat_id') catId: string, @Res() res: Response) {
    try {
      const token = authHeader?.replace('Bearer ', '');
      if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
      }

      const user = await this.usersService.findByToken(token);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
      }

      await this.likesService.deleteLike(catId, user.id);
      res.status(HttpStatus.OK).json({ message: 'Like deleted successfully' });
    } catch (error) {
      if (error.message === 'Like not found') {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
  }
} 