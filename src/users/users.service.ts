import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { CreateUserResDto } from './dto/create-user.res.dto';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user-req.dto';
import { UpdateUserPasswordReqDto } from './dto/update-user-password.dto';
import { DeleteUserReqDto } from './dto/detele-user.req.dto';
import { plainToInstance } from 'class-transformer';
import { PropertyEntity } from 'src/entities/property.entity';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(dataNewUser: CreateUserReqDto) {
    const findUserByEmail = await prisma.user.findUnique({
      where: { email: dataNewUser.email },
    });

    if (findUserByEmail) {
      throw new ConflictException('Email already registered');
    }

    delete dataNewUser.confirmPassword;

    const hashPassword = await hash(dataNewUser.password, 10);
    dataNewUser.password = hashPassword;

    const newUser = await prisma.user.create({ data: dataNewUser });
    return new CreateUserResDto(newUser);
  }

  async update(userId: string, dataUpdate: UpdateUserReqDto) {
    if (dataUpdate.email) {
      const findUserByEmail = await prisma.user.findUnique({
        where: { email: dataUpdate.email },
      });

      if (findUserByEmail && findUserByEmail.id != userId) {
        throw new ConflictException('Email alread registered');
      }
    }

    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: { ...dataUpdate },
    });

    return new UpdateUserResDto(userUpdated);
  }

  async updateAvatar(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new BadRequestException('avatar file is required');
    }

    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: file.path },
    });

    return new UpdateUserResDto(userUpdated);
  }

  async updatePassword(
    userId: string,
    dataUpdatePassword: UpdateUserPasswordReqDto,
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const isMatchPassword = await compare(
      dataUpdatePassword.currentPassword,
      user.password,
    );
    if (!isMatchPassword) {
      throw new ForbiddenException('Password invalid');
    }

    const hashPassword = await hash(dataUpdatePassword.password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashPassword },
    });
  }

  async deactivateAccount(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    return { message: 'User account deativate sucess' };
  }

  async activateAccount(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });

    return { message: 'User account activate sucess' };
  }

  async deleteAccount(userId: string, dataDeleteUser: DeleteUserReqDto) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const isMatchPassword = await compare(
      dataDeleteUser.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new ForbiddenException('Password invalid');
    }

    await prisma.user.delete({ where: { id: userId } });

    return {};
  }

  async getProperties(ownerId: string) {
    const properties = await prisma.property.findMany({
      where: { ownerId },
      include: { PropertyPhotos: true },
      orderBy: { createdAt: 'desc' },
    });

    return plainToInstance(PropertyEntity, properties);
  }
}
