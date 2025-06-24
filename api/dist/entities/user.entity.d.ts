import { Like } from './like.entity';
export declare class User {
    id: number;
    login: string;
    password: string;
    authToken: string;
    likes: Like[];
}
