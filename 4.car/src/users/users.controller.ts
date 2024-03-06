import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateUsetDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  getUsersByEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string,@Body() body:UpdateUsetDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
