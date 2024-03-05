import { Controller, Get, Param } from '@nestjs/common';
import { ComputerService } from './computer.service';

@Controller('computer')
export class ComputerController {
  constructor(public computerService: ComputerService) {}
  @Get('/:item')
  getService(@Param('item') item: 'cpu' | 'disk') {
    return this.computerService.run(item);
  }
}
