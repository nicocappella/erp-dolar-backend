import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsString,
  IsEnum,
  ValidateNested,
} from 'class-validator';

enum TypeMovement {
  'Retirar',
  'Agregar',
}

export class CreateMovementDto {
  @IsMongoId()
  readonly currency: string;

  @IsString()
  @IsEnum(TypeMovement)
  readonly type: string;

  @IsNumber()
  readonly total: number;

  @IsMongoId()
  readonly operator: string;

  @IsString()
  readonly reason?: string;
}

export class CreateMovementsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateMovementDto)
  movements: [CreateMovementDto];
}
