import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import { Request } from 'express';
import { UpdateUserPasswordReqDto } from './dto/update-user-password.dto';
import { DeleteUserReqDto } from './dto/detele-user.req.dto';

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

  @Patch('/password')
  @HttpCode(204)
  async updatePassword(
    @Req() req: Request,
    @Body() dataUpdatePassword: UpdateUserPasswordReqDto,
  ) {
    return await this.usersService.updatePassword(
      req.user.id,
      dataUpdatePassword,
    );
  }

  @Patch('/deactivate/')
  async deactivateAccount(@Req() req: Request) {
    return await this.usersService.deactivateAccount(req.user.id);
  }

  @Patch('/activate/:userId')
  async activateAccount(@Param('userId') userId: string) {
    return await this.usersService.activateAccount(userId);
  }

  @Delete()
  @HttpCode(204)
  async deleteAccount(
    @Req() req: Request,
    @Body() dataDeleteUser: DeleteUserReqDto,
  ) {
    return await this.usersService.deleteAccount(req.user.id, dataDeleteUser);
  }
}
