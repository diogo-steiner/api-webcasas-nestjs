import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionReqDto } from './dto/create-session-req.dto';
import { Request } from 'express';

@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() dataSession: CreateSessionReqDto) {
    return this.sessionsService.create(dataSession);
  }

  @Get()
  async get(@Req() req: Request) {
    return this.sessionsService.get(req.user.id);
  }
}
