import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { CommentModule } from './comment/comment.module';
import { DetailTypeJobModule } from './detail-type-job/detail-type-job.module';
import { ConfigModule } from '@nestjs/config';
import { TypejobsModule } from './typejobs/typejobs.module';
import { HireJobsModule } from './hire-jobs/hire-jobs.module';



@Module({
  imports: [UsersModule, AuthModule, JobModule, CommentModule, DetailTypeJobModule,ConfigModule.forRoot({
    isGlobal: true,}), TypejobsModule, HireJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
