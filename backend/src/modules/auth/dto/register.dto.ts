import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsEmail({}, { message: 'Format d\'email invàlid' })
  email: string;

  @IsString({ message: 'La contrasenya ha de ser una cadena de text' })
  @MinLength(8, { message: 'La contrasenya ha de tenir almenys 8 caràcters' })
  password: string;

  @IsString({ message: 'El nom ha de ser una cadena de text' })
  @MinLength(2, { message: 'El nom ha de tenir almenys 2 caràcters' })
  firstName: string;

  @IsString({ message: 'El cognom ha de ser una cadena de text' })
  @MinLength(2, { message: 'El cognom ha de tenir almenys 2 caràcters' })
  lastName: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Rol d\'usuari invàlid' })
  role?: UserRole;

  @IsNumber({}, { message: 'ID d\'escola invàlid' })
  schoolId: number;

  @IsOptional()
  @IsString({ message: 'El telèfon ha de ser una cadena de text' })
  phone?: string;
} 