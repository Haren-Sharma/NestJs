import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUsetDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './users.auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from 'src/Guards/authGuard.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor) //we will make this glabally scoped
export class UsersController {
  constructor(private userService: UsersService,private authService:AuthService) {}

  //just for demonstration

  // @Get('/:color')
  // getColor(@Param('color') color:string,@Session() session:any){
  //   session.color=color;
  // }

  // @Get('/current/color')
  // getCurrent(@Session() session:any){
  //   return session.color;
  // }

  // @Get('/whoami')
  // whoami(@Session() session:any){
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoami(@CurrentUser() user:UserDto){
    console.log(user);
    return user;
  }

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto,@Session() session:any) {
    // return this.userService.create(body);  
    const user=await this.authService.signup(body.email,body.password);
    session.userId=user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body:CreateUserDto,@Session() session:any){
    const user=await this.authService.signIn(body.email,body.password);
    session.userId=user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session:any){
    session.userId=null;
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
