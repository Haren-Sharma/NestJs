import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export  const CurrentUser=createParamDecorator((data:any,context:ExecutionContext)=>{
    const request=context.switchToHttp().getRequest();
    //we want session object and user service instance
    //session object is directly available
    // const userId=request.session.userId;
    //but userservice is part of the dependency injection,so
    //we cannot directly import it and use it as it uses 
    //user repository that is set up only by dependency injection
    //that is why we make use of interceptors here,as they can be
    //part of the dependency injection system.
    //we have to make them injectable and declare it in providers
    return request.currentUser;
})