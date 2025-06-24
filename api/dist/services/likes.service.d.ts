import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { User } from '../entities/user.entity';
export declare class LikesService {
    private likesRepository;
    constructor(likesRepository: Repository<Like>);
    createLike(catId: string, user: User): Promise<Like>;
    getLikesByUser(userId: number): Promise<Like[]>;
    deleteLike(catId: string, userId: number): Promise<void>;
}
