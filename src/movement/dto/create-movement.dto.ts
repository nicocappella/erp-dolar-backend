import { IsMongoId, IsNumber } from 'class-validator';

export class CreateMovementDto {
  @IsMongoId()
  readonly currency: string;

  @IsNumber()
  readonly total: number;
}
