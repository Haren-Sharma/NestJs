import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

//to ensure it is a class
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private Dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //run something before a request is handled by the request handler
    // console.log("I am running before the handler ",context)
    return next.handle().pipe(
      map((data: any) => {
        //run something before the response is sent out
        // console.log("I am running before response is sent out ",data)
        //we want to convert the data entity instance to userdto instance
        return plainToInstance(this.Dto, data, {
          excludeExtraneousValues: true, //most imp property
        });
      }),
    );
  }
}
