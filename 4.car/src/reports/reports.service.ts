import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}
  async createReport(data:CreateReportDto){
    const report=this.reportRepo.create(data);
    await this.reportRepo.save(report);
    return report;
  }
}
