import { IsMongoId, IsNumber, IsString, IsEnum } from 'class-validator';

enum Type {
  ADD = 'Agregar',
  WITHDRAW = 'Retirar',
}

export class CreateMovementDto {
  @IsMongoId()
  readonly currency: string;

  @IsString()
  @IsEnum(Type)
  readonly type: string;

  @IsNumber()
  readonly total: number;
}
