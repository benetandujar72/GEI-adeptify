import { School } from '../../schools/entities/school.entity';
import { GamificationPoints } from '../../gamification/entities/gamification-points.entity';
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    PARENT = "parent",
    FAMILY = "family"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
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
    isGoogleAuth: boolean;
    lastLogin: Date;
    lastLoginAt: Date;
    classId: string;
    familyId: string;
    gamification: {
        points?: number;
        level?: number;
        badges?: string[];
        achievements?: string[];
        xp?: number;
        weeklyPoints?: number;
        monthlyPoints?: number;
        streak?: number;
        lastActivity?: Date;
        totalReservations?: number;
        totalStudyHours?: number;
        favoriteSpaces?: string[];
        completedChallenges?: string[];
        notifications?: boolean;
    };
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
