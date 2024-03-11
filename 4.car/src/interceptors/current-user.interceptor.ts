import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable() //to make use of userservice instance
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userservice:UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request=context.switchToHttp().getRequest();
        const {userId}=request.session || {};
        if(userId){
            const user=await this.userservice.findOne(parseInt(userId));
            request.currentUser=user;
        }   
        return next.handle();//this implies to eventually run the route handler 
    }
}