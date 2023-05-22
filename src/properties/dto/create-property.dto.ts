import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(1, 72)
  @Transform(({ value }) => value.trim())
  title: string;

  @IsString()
  @Length(1, 900)
  @Transform(({ value }) => value.trim())
  description: string;

  @IsNumber()
  @IsInt()
  @Max(32767)
  numberRooms: number;

  @IsNumber()
  @IsInt()
  @Max(32767)
  numberBathrooms: number;

  @IsNumber()
  @IsInt()
  @Max(32767)
  numberGarage: number;

  @IsString()
  @Length(1, 16)
  @IsEnum(['Casa', 'Apartamento'])
  propertyType: string;

  @IsBoolean()
  @IsOptional()
  isSale: boolean;

  @IsBoolean()
  @IsOptional()
  isInCondo: boolean;

  @IsBoolean()
  @IsOptional()
  hasPoolProperty: boolean;

  @IsBoolean()
  @IsOptional()
  hasAirConditioningProperty: boolean;

  @IsBoolean()
  @IsOptional()
  hasGrillProperty: boolean;

  @IsBoolean()
  @IsOptional()
  hasFurnitureProperty: boolean;

  @IsBoolean()
  @IsOptional()
  hasPoolCondo: boolean;

  @IsBoolean()
  @IsOptional()
  hasSecurity24hCondo: boolean;

  @IsBoolean()
  @IsOptional()
  hasGymCondo: boolean;

  @IsBoolean()
  @IsOptional()
  hasPartyHallCondo: boolean;

  @IsNumberString({ locale: 'pt-BR' })
  @Length(1, 12)
  price: string;

  @IsNumberString({ locale: 'pt-BR' })
  @Length(1, 12)
  @IsOptional()
  priceCondo: string;

  @IsBoolean()
  @IsOptional()
  isCondoPriceIncluded: boolean;

  @IsString()
  @Length(1, 36)
  @Transform(({ value }) => value.trim())
  state: string;

  @IsString()
  @Length(1, 36)
  @Transform(({ value }) => value.trim())
  city: string;

  @IsNumberString()
  @Length(11)
  contact: string;

  @IsBoolean()
  @IsOptional()
  isDisplayContact: boolean;
}
