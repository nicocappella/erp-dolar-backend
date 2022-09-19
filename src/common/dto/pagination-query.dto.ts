import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  skip: number;

  @IsOptional()
  @IsPositive()
  limit: number;
}
