import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqDto } from './dto/create-user-req.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserReqDto: CreateUserReqDto) {
    return await this.usersService.create(createUserReqDto);
  }
}
