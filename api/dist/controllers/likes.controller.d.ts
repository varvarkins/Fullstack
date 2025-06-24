import { Response } from 'express';
import { LikesService } from '../services/likes.service';
import { UsersService } from '../services/users.service';
declare class CreateLikeDto {
    cat_id: string;
}
export declare class LikesController {
    private readonly likesService;
    private readonly usersService;
    constructor(likesService: LikesService, usersService: UsersService);
    getLikes(authHeader: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createLike(authHeader: string, createLikeDto: CreateLikeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteLike(authHeader: string, catId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
