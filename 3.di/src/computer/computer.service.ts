import { Injectable } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Injectable()
export class ComputerService {
  constructor(
    public cpuService: CpuService,
    public diskService: DiskService,
  ) {}
  run(item: 'cpu' | 'disk') {
    if (item === 'cpu') return this.cpuService.compute(30);
    else return this.diskService.getData(40);
  }
}
