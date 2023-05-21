import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';
import { ensureAuthMiddleware } from './users/middlewares/ensureAuth.middleware';

@Module({
  imports: [],
  controllers: [UsersController, SessionsController],
  providers: [UsersService, SessionsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .forRoutes({ path: 'sessions', method: RequestMethod.GET });
  }
}
