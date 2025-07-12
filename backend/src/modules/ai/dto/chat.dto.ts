import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsUUID()
  messageId?: string;
} 