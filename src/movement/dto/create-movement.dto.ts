import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsString,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export enum TypeMovement {
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
  @IsOptional()
  readonly reason?: string;
}

export class CreateMovementsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateMovementDto)
  movements: [CreateMovementDto];
}
