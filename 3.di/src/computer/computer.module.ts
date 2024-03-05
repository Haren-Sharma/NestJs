import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { ComputerService } from './computer.service';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';

@Module({
  imports:[CpuModule,DiskModule],
  controllers: [ComputerController],
  providers: [ComputerService]
})
export class ComputerModule {}
