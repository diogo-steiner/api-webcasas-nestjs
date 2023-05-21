import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionReqDto } from './dto/create-session-req.dto';

@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() dataSession: CreateSessionReqDto) {
    return this.sessionsService.create(dataSession);
  }
}
