import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSessionReqDto } from './dto/create-session-req.dto';
import { CreateSessionResDto } from './dto/create-session-res.dto';

const prisma = new PrismaClient();

@Injectable()
export class SessionsService {
  async create(dataSession: CreateSessionReqDto) {
    const user = await prisma.user.findUnique({
      where: { email: dataSession.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const matchPassword = await compare(dataSession.password, user.password);

    if (!matchPassword) {
      throw new UnauthorizedException('Email or password invalid');
    }

    if (!user.isActive) {
      throw new ForbiddenException({
        message: 'User account disabled',
        user: {
          id: user.id,
          isActive: user.isActive,
        },
      });
    }

    const token = jwt.sign({}, process.env.SECRET_KEY, {
      expiresIn: '72h',
      subject: user.id,
    });

    return new CreateSessionResDto({ token, user });
  }
}
