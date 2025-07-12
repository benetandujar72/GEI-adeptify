import { School } from '../../schools/entities/school.entity';
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    FAMILY = "family",
    SUPPORT_STAFF = "support_staff"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
    password?: string;
    googleId?: string;
    profilePicture?: string;
    bio?: string;
    preferences?: {
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            sms: boolean;
            push: boolean;
            whatsapp: boolean;
        };
        theme: 'light' | 'dark' | 'auto';
    };
    schoolId: number;
    school: School;
    classId?: string;
    familyId?: string;
    academicInfo?: {
        grade?: string;
        subjects?: string[];
        academicYear?: string;
        teacherId?: string;
    };
    gamification?: {
        points: number;
        level: number;
        badges: string[];
        achievements: string[];
    };
    lastLoginAt?: Date;
    emailVerifiedAt?: Date;
    phoneVerifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
    get isActive(): boolean;
    get isTeacher(): boolean;
    get isStudent(): boolean;
    get isFamily(): boolean;
    get isAdmin(): boolean;
}
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
