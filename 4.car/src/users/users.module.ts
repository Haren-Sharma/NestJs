import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './users.auth.service';
import { CurrentUserInterceptor } from 'src/interceotors/current-user.interceptor';

@Module({
  imports:[TypeOrmModule.forFeature([User])],//this step creates the UserRepository
  providers: [UsersService,AuthService,CurrentUserInterceptor],
  controllers: [UsersController]
})
export class UsersModule {}
