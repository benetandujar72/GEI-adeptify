import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(schoolId: string, currentUser: User): Promise<User[]>;
    findOne(id: string, currentUser: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(createUserDto: CreateUserDto, currentUser: User): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser: User): Promise<User>;
    remove(id: string, currentUser: User): Promise<void>;
    activateUser(id: string, currentUser: User): Promise<User>;
    deactivateUser(id: string, currentUser: User): Promise<User>;
    updateGamification(id: string, gamificationData: {
        points?: number;
        level?: number;
        badges?: string[];
        achievements?: string[];
    }, currentUser: User): Promise<User>;
    addPoints(id: string, points: number, currentUser: User): Promise<User>;
    addBadge(id: string, badge: string, currentUser: User): Promise<User>;
    addAchievement(id: string, achievement: string, currentUser: User): Promise<User>;
    findByRole(role: UserRole, schoolId: string): Promise<User[]>;
    findByClass(classId: string, currentUser: User): Promise<User[]>;
    findByFamily(familyId: string, currentUser: User): Promise<User[]>;
    private canViewUsers;
    private canViewUser;
    private canCreateUser;
    private canUpdateUser;
    private canChangeRole;
    private canDeleteUser;
    private canActivateUser;
    private canDeactivateUser;
    private canUpdateGamification;
    private canViewClass;
    private canViewFamily;
}
