import { Module } from '@nestjs/common';
import { TypejobsService } from './typejobs.service';
import { TypejobsController } from './typejobs.controller';

@Module({
  controllers: [TypejobsController],
  providers: [TypejobsService],
})
export class TypejobsModule {}
