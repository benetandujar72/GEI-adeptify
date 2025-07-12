import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsUUID, IsNumber } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'Format d\'email invàlid' })
  email: string;

  @IsString({ message: 'El nom ha de ser una cadena de text' })
  @MinLength(2, { message: 'El nom ha de tenir almenys 2 caràcters' })
  firstName: string;

  @IsString({ message: 'El cognom ha de ser una cadena de text' })
  @MinLength(2, { message: 'El cognom ha de tenir almenys 2 caràcters' })
  lastName: string;

  @IsEnum(UserRole, { message: 'Rol d\'usuari invàlid' })
  role: UserRole;

  @IsNumber({}, { message: 'ID d\'escola invàlid' })
  schoolId: number;

  @IsOptional()
  @IsString({ message: 'El telèfon ha de ser una cadena de text' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'La bio ha de ser una cadena de text' })
  bio?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de classe invàlid' })
  classId?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de família invàlid' })
  familyId?: string;

  @IsOptional()
  academicInfo?: {
    grade?: string;
    subjects?: string[];
    academicYear?: string;
    teacherId?: string;
  };
} 