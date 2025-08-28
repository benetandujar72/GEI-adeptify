import { User } from '../../users/entities/user.entity';
import { Resource } from '../../resources/entities/resource.entity';
export declare class School {
    id: number;
    name: string;
    code: string;
    address: string;
    phone: string;
    email: string;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    resources: Resource[];
}
