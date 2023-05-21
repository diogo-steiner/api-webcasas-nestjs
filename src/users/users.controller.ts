import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import { Request } from 'express';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserReqDto: CreateUserReqDto) {
    return await this.usersService.create(createUserReqDto);
  }

  @Patch()
  async update(@Req() req: Request, @Body() dataUpdate: UpdateUserReqDto) {
    return await this.usersService.update(req.user.id, dataUpdate);
  }
}
