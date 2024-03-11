import { Test } from '@nestjs/testing';
import { AuthService } from './users.auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  const users: User[] = [];
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake copy of user service
    fakeUserService = {
      find: (email: string) => {
        return Promise.resolve(users.filter((user) => user.email === email));
      },
      create: (data: CreateUserDto) => {
        const user = { id: Math.trunc(Math.random() * 9999), ...data } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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
    await expect(service.signup('haren@gmail.com', '1234')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('throws an error if user signs with an email that doesnot exists in db', async () => {
    await expect(service.signIn('haren67@gmail.com', '1234')).rejects.toThrow(
      NotFoundException,
    );
  });
  it('throws an error if an invalid password is provided', async () => {
    await expect(service.signIn('haren@gmail.com', '124')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user is password is correct', async () => {
    const user = await service.signIn('haren@gmail.com', '1234');
    expect(user).toBeDefined();
  });
});
