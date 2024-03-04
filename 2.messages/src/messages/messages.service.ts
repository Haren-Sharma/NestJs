import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
    messagerepo:MessagesRepository;
    constructor(){
        //the service is creating it's own dependencies
        //Don't do this in real apps
        this.messagerepo=new MessagesRepository();
    }
    async findOne(id:string){
        return this.messagerepo.findOne(id);
    }
    async findAll(){
        return this.messagerepo.findAll();
    }
    async create(content:string){
        return this.messagerepo.createMessage(content);
    }
}
