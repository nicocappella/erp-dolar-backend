import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBalanceDto {
  @IsString()
  readonly currency: string;

  @IsOptional()
  @IsNumber()
  readonly closed?: number;

  @IsOptional()
  @IsNumber()
  readonly executed?: number;
}
