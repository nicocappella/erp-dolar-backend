import { IsString } from 'class-validator';

export class CreateOperatorDto {
  @IsString()
  readonly name: string;
}
