import { Module } from '@nestjs/common';
import { HireJobsService } from './hire-jobs.service';
import { HireJobsController } from './hire-jobs.controller';

@Module({
  controllers: [HireJobsController],
  providers: [HireJobsService],
})
export class HireJobsModule {}
