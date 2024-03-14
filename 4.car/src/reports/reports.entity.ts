import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:false})
  approved:boolean;
  
  @ManyToOne(()=>User,(user)=>user.reports)
  user:User;
  
  @Column()
  price: number;
  
  @Column()
  make: string;
  
  @Column()
  model: string;
  
  @Column()
  year: number;
  
  @Column()
  lat: number;
  
  @Column()
  lang: number;
  
  @Column()
  mileage: number;
  
}
