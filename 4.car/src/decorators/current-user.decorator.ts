import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export  const currentUser=createParamDecorator((data:any,context:ExecutionContext)=>{
    const request=context.switchToHttp().getRequest();
    //we want session object and user service instance
    //session object is directly available
    // const userId=request.session.userId;
    //but userservice is part of the dependency injection,so
    //we cannot directly import it and use it as it uses 
    //user repository that is set up only by dependency injection
    //that is why we make use of interceptors here,as they are
    //part of the dependency injection system.
    return request.currentUser;
})