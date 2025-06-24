import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(login: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
    findByToken(token: string): Promise<User | null>;
}
