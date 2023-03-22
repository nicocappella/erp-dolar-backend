import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;
}
