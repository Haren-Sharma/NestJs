import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './users.auth.service';
import { User } from './users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';

describe('UsersController', () => {
  const users:User[]=[]
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne:(id:number)=>{ return Promise.resolve(users.find(usr=>usr.id===id))},
      find:(email:string)=>{return Promise.resolve(users.filter(usr=>usr.email!==email))},
      update:(id:number,attrs:Partial<User>)=>{
        const idx=users.findIndex(usr=>usr.id===id);
        users[idx]={...users[idx],...attrs} as User;
        return Promise.resolve(users[idx]);
      },
      remove:(id:number)=>{
        const idx=users.findIndex(usr=>usr.id===id);
        return Promise.resolve(users.splice(idx,1)[0])
      }
    };
    fakeAuthService = {
      signup:(email:string,password:string)=>{
        const user={id:Math.trunc(Math.random()*99999),email,password} as User;
        users.push(user);
        return Promise.resolve(user);
      },
      signIn:(email:string,password:string)=>{
        const user=users.find(user=>user.password===password);
        return Promise.resolve(user);
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user',async()=>{
    const user=await controller.signUp({email:'haren@gmail.com',password:'password'},{});
    expect(user).toBeDefined();
  })
});
