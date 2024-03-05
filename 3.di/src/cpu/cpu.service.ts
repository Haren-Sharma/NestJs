import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor(public powerService:PowerService){}
    compute(watts:number){
        return this.powerService.supplyPower(watts);
    }
}   
