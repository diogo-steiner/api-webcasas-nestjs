import {
  IsAlpha,
  IsEmail,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CompareConfirmPasswordWithPassword } from './decorators/CompareConfirmPasswordWithPassword';

export class CreateUserReqDto {
  @IsAlpha()
  @Length(2, 16)
  firstName: string;

  @IsAlpha()
  @Length(2, 16)
  lastName: string;

  @IsEmail()
  @Length(6, 48)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Your password must contain at least 6 characters with at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character',
    },
  )
  @MaxLength(72)
  password: string;

  @CompareConfirmPasswordWithPassword()
  confirmPassword: string;
}
