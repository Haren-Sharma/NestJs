import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/createReport.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/Guards/authGuard.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDtoRes } from './dtos/report.dto';

@Controller('reports')
@Serialize(ReportDtoRes)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto,@CurrentUser() user:User) {
    const report = await this.reportsService.createReport(body,user);
    return report;
  }
  
  @Patch('/:id')
  @UseGuards(AuthGuard)
  async approveReport(@Param('id') id:string,@Body() body:{approved:boolean},@CurrentUser() user:User){
    const report=await this.reportsService.approveReport(parseInt(id),body,user);
    return report;
  }
}
