import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Format d\'email invàlid' })
  email: string;

  @IsString({ message: 'La contrasenya ha de ser una cadena de text' })
  @MinLength(6, { message: 'La contrasenya ha de tenir almenys 6 caràcters' })
  password: string;
} 