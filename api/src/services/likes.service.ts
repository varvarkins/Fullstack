import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async createLike(catId: string, user: User): Promise<Like> {
    const existingLike = await this.likesRepository.findOne({
      where: { cat_id: catId, userId: user.id }
    });

    if (existingLike) {
      throw new Error('Like already exists');
    }

    const like = new Like();
    like.cat_id = catId;
    like.userId = user.id;
    like.user = user;

    return this.likesRepository.save(like);
  }

  async getLikesByUser(userId: number): Promise<Like[]> {
    return this.likesRepository.find({
      where: { userId },
      order: { created_at: 'DESC' }
    });
  }

  async deleteLike(catId: string, userId: number): Promise<void> {
    const like = await this.likesRepository.findOne({
      where: { cat_id: catId, userId }
    });

    if (!like) {
      throw new Error('Like not found');
    }

    await this.likesRepository.remove(like);
  }
} 