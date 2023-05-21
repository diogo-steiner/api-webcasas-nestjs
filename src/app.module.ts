import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';

@Module({
  imports: [],
  controllers: [UsersController, SessionsController],
  providers: [UsersService, SessionsService],
})
export class AppModule {}
