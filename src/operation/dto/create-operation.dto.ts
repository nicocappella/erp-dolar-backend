import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class CreateOperationDto {
  @IsMongoId()
  readonly client: string;

  @IsMongoId()
  readonly operator: string;

  @IsString()
  readonly operation: string;

  @IsMongoId()
  readonly listedCurrency: string;

  @IsMongoId()
  readonly refCurrency: string;

  @IsNumber()
  readonly rate: number;

  @IsNumber()
  readonly buy: number;

  @IsNumber()
  readonly sell: number;

  @IsString()
  readonly state: string;
}
