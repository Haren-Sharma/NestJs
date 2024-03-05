import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(public powerService:PowerService){}
    getData(watts:number){
        return this.powerService.supplyPower(watts);
    }
}
