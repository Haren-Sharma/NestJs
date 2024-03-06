import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt } from "crypto";

@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}
    getHash(password:string,salt:string){
        return new Promise((resolve,reject)=>{
            scrypt(password,salt,32,(err,hash)=>{
                if(hash) resolve(hash.toString('hex'))
                else reject(err)
            })
        })
    }
    async signup(email:string,password:string){
        //see if email is in use
        const user=await this.userService.find(email);
        if(user?.length!==0) throw new BadRequestException('Email already in use');
        //hash the users password
        const salt=randomBytes(8).toString('hex');//generating the salt
        console.log("Salt",salt)
        const hash=await this.getHash(password,salt);//generating the hash
        console.log("Hash",hash);
        const res=salt+'.'+hash;
        //create a new user and save it
        const newuser=await this.userService.create({email,password:res})
        //return the user
        return newuser;
    }
    async signIn(email:string,password:string){
        //will find whether the user exists or not
        const [user]=await this.userService.find(email);
        if(!user) throw new BadRequestException('User Doesnot exists');
        //split the salt and hash from the password
        const [salt,hash]=user.password.split('.');
        //generate the hash and compare ,if same ,the user is authenticated otherwise not
        const genHash=await this.getHash(password,salt);
        if(genHash===hash){
            return 'User is signed in'
        }
        else {
            throw new BadRequestException('Invalid Credentials');
        }
    }
}