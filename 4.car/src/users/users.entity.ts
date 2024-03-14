import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/reports.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  @Column()
  // @Exclude()
  //password will be excluded when the user entity instance will be converted into a plain object
  //by the class serializer interceptor,i.e,we won't be getting password while fetching the user
  //But this is not the efficient solution
  //Problem is what if we want multiple routes to get diffrent kinds of data
  //To solve that problem we will use custom interceptor which will convert the user entity instnace
  //into a plain object and eventually into json by using a user dto(dto that describes how to serialize a user for a particular route handler)
  password: string;

  @OneToMany(()=>Report,(report)=>report.user)
  reports:Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id ');
  }
}
