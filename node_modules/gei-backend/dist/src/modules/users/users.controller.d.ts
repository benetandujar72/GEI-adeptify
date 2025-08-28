import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: any): Promise<User>;
    findAll(req: any, schoolId: string): Promise<User[]>;
    findOne(id: string, req: any): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User>;
    remove(id: string, req: any): Promise<void>;
    activateUser(id: string, req: any): Promise<User>;
    deactivateUser(id: string, req: any): Promise<User>;
    addPoints(id: string, body: {
        points: number;
    }, req: any): Promise<User>;
    addBadge(id: string, body: {
        badge: string;
    }, req: any): Promise<User>;
    addAchievement(id: string, body: {
        achievement: string;
    }, req: any): Promise<User>;
    findByRole(role: string, schoolId: string, req: any): Promise<User[]>;
    findByClass(classId: string, req: any): Promise<User[]>;
    findByFamily(familyId: string, req: any): Promise<User[]>;
    getMyProfile(req: any): Promise<User>;
    updateMyProfile(updateUserDto: UpdateUserDto, req: any): Promise<User>;
}
