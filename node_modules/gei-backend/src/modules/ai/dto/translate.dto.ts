import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsIn(['ca', 'es', 'en', 'fr'])
  targetLanguage: string;
} 