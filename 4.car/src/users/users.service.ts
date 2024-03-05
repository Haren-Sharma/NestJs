import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}
    create(data:CreateUserDto){
        const user=this.repo.create(data);
        return this.repo.save(user);
    }
}
