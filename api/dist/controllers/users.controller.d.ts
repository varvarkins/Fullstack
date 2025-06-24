import { Response } from 'express';
import { UsersService } from '../services/users.service';
declare class CreateUserDto {
    login: string;
    password: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto, res: Response): Promise<void>;
}
export {};
