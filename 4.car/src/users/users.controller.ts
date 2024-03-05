import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
