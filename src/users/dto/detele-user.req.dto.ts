import { IsString } from 'class-validator';

export class DeleteUserReqDto {
  @IsString()
  password: string;
}
