import { Module } from '@nestjs/common';
import { CongViecController } from './job.controller';
import { CongViecService } from './job.service';
import { ShareModule } from 'src/shared/shareModule';




@Module({
  imports: [ShareModule],
  controllers: [CongViecController],
  providers: [CongViecService],
})
export class JobModule {}
