import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}
  async createReport(data: CreateReportDto, user: User) {
    const report = this.reportRepo.create(data);
    report.user = user;
    await this.reportRepo.save(report); //when we are saving this ,behind the scenes
    //typeorm will fetch the user id and save it in reports table
    return report;
  }
  async approveReport(id: number,data:{approved:boolean},user:User) {
    let report = await this.reportRepo.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report Does Not Exist');
    report={...report,...data};
    report.user=user;
    await this.reportRepo.save(report);
    return report;
  }
}
