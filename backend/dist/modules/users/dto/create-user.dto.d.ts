import { UserRole } from '../entities/user.entity';
export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    schoolId: string;
    phone?: string;
    bio?: string;
    classId?: string;
    familyId?: string;
    academicInfo?: {
        grade?: string;
        subjects?: string[];
        academicYear?: string;
        teacherId?: string;
    };
}
