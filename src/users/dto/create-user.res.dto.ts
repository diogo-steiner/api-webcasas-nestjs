import {
  IsString,
  IsUUID,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserResDto {
  constructor(newUser: CreateUserResDto) {
    this.id = newUser.id;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.email = newUser.email;
    this.avatarUrl = newUser.avatarUrl;
    this.isActive = newUser.isActive;
    this.updatedAt = newUser.updatedAt;
    this.createdAt = newUser.createdAt;
  }

  @IsUUID()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  avatarUrl: string | null;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  createdAt: Date;
}
