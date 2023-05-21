import { IsEmail, IsString } from 'class-validator';

export class CreateSessionReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
