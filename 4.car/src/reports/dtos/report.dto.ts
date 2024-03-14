import { Expose, Transform } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class ReportDtoRes {
  @Expose()
  id: number;

  @Transform(({obj})=>obj.user.id) //obj is the original report entity instance
  @Expose()
  userId: UserDto;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lang: number;

  @Expose()
  mileage: number;

  @Expose()
  approved:boolean;

}
