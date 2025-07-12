import { School } from '../../schools/entities/school.entity';
import { GamificationPoints } from '../../gamification/entities/gamification-points.entity';
export declare enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    PARENT = "parent"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    profilePicture: string;
    phone: string;
    preferences: Record<string, any>;
    googleId: string;
    isEmailVerified: boolean;
    lastLogin: Date;
    schoolId: string;
    school: School;
    gamificationPoints: GamificationPoints[];
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
    get isAdmin(): boolean;
    get isTeacher(): boolean;
    get isStudent(): boolean;
    get isParent(): boolean;
}
