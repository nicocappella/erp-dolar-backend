import { IsBoolean, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly value: string;

  @IsString()
  readonly symbol: string;

  @IsBoolean()
  readonly reference: boolean;

  @IsBoolean()
  readonly listed: boolean;
}
