import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUsetDto } from './dtos/update-user.dto';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceotors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './users.auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService,private authService:AuthService) {}

  @Get('/:color')
  getColor(@Param('color') color:string,@Session() session:any){
    session.color=color;
  }

  @Get('/current/color')
  getCurrent(@Session() session:any){
    return session.color;
  }

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    // return this.userService.create(body);  
    return this.authService.signup(body.email,body.password);
  }

  @Post('/signin')
  signin(@Body() body:CreateUserDto){
    return this.authService.signIn(body.email,body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    // console.log("Running the handler");
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  getUsersByEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUsetDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
