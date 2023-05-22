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
import { ensureAuthMiddleware } from './sessions/middlewares/ensureAuth.middleware';
import { PropertiesController } from './properties/properties.controller';
import { PropertiesService } from './properties/properties.service';

@Module({
  imports: [],
  controllers: [UsersController, SessionsController, PropertiesController],
  providers: [UsersService, SessionsService, PropertiesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/activate/:userId', method: RequestMethod.PATCH },
        { path: 'properties', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: 'sessions', method: RequestMethod.GET },
        UsersController,
        PropertiesController,
      );
  }
}
