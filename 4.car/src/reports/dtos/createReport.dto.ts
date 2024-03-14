import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  price: number;

  @IsString()
  make: string;
  
  @IsString()
  model: string;
  
  @IsNumber()
  @Max(2024, { message: 'Maximum year exceeded' })
  @Min(1900, { message: 'Before 1990 not allowed' })
  year: number;
  
  @IsLatitude()
  lat: number;
  
  @IsLongitude()
  lang: number;
  
  @IsNumber()
  @Min(0)
  @Max(1000)
  mileage: number;
  
}
