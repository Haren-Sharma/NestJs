import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
/*
Controller is a class decorator
Get and Post are method decorators
Body and Param are argument decorators
*/

@Controller('messages')
export class MessagesController {
  //   messageService: MessagesService;
  //   constructor() {
  //     this.messageService = new MessagesService();
  //   }
  constructor(public messageService: MessagesService) {}

  @Get()
  listAllMessages() {
    //get all msgs
    return this.messageService.findAll();
  }
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.create(body.content);
  }
  @Get('/:id')
  async getMessageById(@Param('id') id: string) {
    const msg = await this.messageService.findOne(id);
    if (!msg) throw new NotFoundException('Message Not Found BC');
    return msg;
  }
}
