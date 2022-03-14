import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  readonly name: string;
}
