import { UserRole } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  schoolId: number;
  iat?: number; // Issued at
  exp?: number; // Expiration time
} 