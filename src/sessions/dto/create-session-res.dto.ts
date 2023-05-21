import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateSessionResUserDto {
  constructor(user: CreateSessionResUserDto) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.isActive = user.isActive;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
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

export class CreateSessionResDto {
  constructor(newSession: CreateSessionResDto) {
    this.token = newSession.token;
    this.user = new CreateSessionResUserDto(newSession.user);
  }

  @IsString()
  token: string;

  @ValidateNested()
  user: CreateSessionResUserDto;
}
