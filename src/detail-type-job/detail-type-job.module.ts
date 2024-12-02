import { Module } from '@nestjs/common';
import { DetailTypeJobService } from './detail-type-job.service';
import { DetailTypeJobController } from './detail-type-job.controller';
import { ShareModule } from 'src/shared/shareModule';

@Module({
  imports: [ShareModule],
  controllers: [DetailTypeJobController],
  providers: [DetailTypeJobService],
})
export class DetailTypeJobModule {}
