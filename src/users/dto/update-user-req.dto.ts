import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { CreateUserResDto } from './create-user.res.dto';

export class UpdateUserReqDto {
  @Length(2, 16)
  @Transform(({ value }) => value.trim())
  @IsOptional()
  firstName: string;

  @Length(2, 16)
  @Transform(({ value }) => value.trim())
  @IsOptional()
  lastName: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  @IsOptional()
  email: string;
}

export class UpdateUserResDto extends CreateUserResDto {}
