import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(data: CreateUserDto) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user=await this.repo.findOne({where:{id}});
    if(!user) throw new Error("User Doesnot Exists")
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    console.log(attrs);
    const user = await this.findOne(id);
    if (!user) throw new Error('User doesnot exists');
    Object.assign(user, attrs);
    console.log(user);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User doesnot exists');
    return this.repo.remove(user);
  }
}
