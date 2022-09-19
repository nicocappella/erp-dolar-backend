import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsArray()
  readonly roles?: string[];

  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
