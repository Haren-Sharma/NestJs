import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './users.auth.service';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //this step creates the UserRepository
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,//this will provide this interceptor globally in the application
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
