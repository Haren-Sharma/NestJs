import { Test } from '@nestjs/testing';
import { AuthService } from './users.auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake copy of user service
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (data: CreateUserDto) =>
        Promise.resolve({ id: 1, ...data } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile(); //this will create a di container
    service = module.get(AuthService);
  });

  it('it can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and a hashed password', async () => {
    const user = await service.signup('haren@gmail.com', '1234');
    expect(user.password).not.toEqual('1234');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sign up with an email that is already in use', async () => {
    fakeUserService.find = () => {
      return Promise.resolve([{ id: 1, email: 'a', password: 'a' } as User]);
    };
    await expect(service.signup('test@test.com', '1234')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('throws an error if user signs with an email that doesnot exists in db', async () => {
    await expect(service.signIn('haren67@gmail.com', '1234')).rejects.toThrow(
      NotFoundException,
    );
  });
  it('throws an error if an invalid password is provided',async ()=>{
    fakeUserService.find=()=>{
        return Promise.resolve([{id:1,email:'test@test.com',password:'234'} as User])
    }
    await expect(service.signIn('test@test.com','123')).rejects.toThrow(BadRequestException)
  })

  it('returns a user is password is correct',async()=>{
    fakeUserService.find=()=>{
        return Promise.resolve([{id:1,email:'test@test.com',password:'123.456'} as User])
    }
    service.getHash=(pass:string,salt:string)=>{
        return Promise.resolve('456')
    }
    const user=await service.signIn('test@test.com','1234');
    expect(user).toBeDefined();
  })
});
