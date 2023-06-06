import { IsString, IsStrongPassword } from 'class-validator';
import { CompareConfirmPasswordWithPassword } from './decorators/CompareConfirmPasswordWithPassword';

export class UpdateUserPasswordReqDto {
  @IsString()
  currentPassword: string;

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
  password: string;

  @CompareConfirmPasswordWithPassword()
  confirmPassword: string;
}
