import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { CreateUserResDto } from './dto/create-user.res.dto';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user-req.dto';

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
}
