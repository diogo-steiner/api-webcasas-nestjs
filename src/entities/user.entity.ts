import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: null | string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity[]>) {
    Object.assign(this, partial);
  }
}
