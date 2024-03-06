import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUsetDto{
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    password:string;
}