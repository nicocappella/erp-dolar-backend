import { Exclude } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsArray()
  readonly roles?: string[];
}
