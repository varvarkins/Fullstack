import { User } from './user.entity';
export declare class Like {
    id: number;
    cat_id: string;
    created_at: Date;
    user: User;
    userId: number;
}
