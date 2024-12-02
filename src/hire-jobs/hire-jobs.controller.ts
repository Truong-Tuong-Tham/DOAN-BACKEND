import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HireJobsService } from './hire-jobs.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('HireJobs')
@Controller('hire-jobs')
export class HireJobsController {
  constructor(private readonly hireJobsService: HireJobsService) {}

  // Thêm công việc thuê
  @Post()
  @ApiBody({ type: CreateHireJobDto })
  @ApiResponse({
    status: 201,
    description: 'Công việc thuê được tạo thành công.',
  })
  create(@Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobsService.create(createHireJobDto);
  }

  // Lấy danh sách công việc thuê
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Danh sách công việc thuê.',
  })
  findAll() {
    return this.hireJobsService.findAll();
  }

  // Tìm công việc thuê theo ID
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID của công việc thuê' })
  @ApiResponse({
    status: 200,
    description: 'Công việc thuê tìm thấy.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy công việc thuê.',
  })
  findOne(@Param('id') id: string) {
    return this.hireJobsService.findOne(+id);
  }

  // Cập nhật công việc thuê
  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID của công việc thuê' })
  @ApiBody({ type: UpdateHireJobDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật công việc thuê thành công.',
  })
  update(@Param('id') id: string, @Body() updateHireJobDto: UpdateHireJobDto) {
    return this.hireJobsService.update(+id, updateHireJobDto);
  }

  // Xóa công việc thuê
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID của công việc thuê' })
  @ApiResponse({
    status: 200,
    description: 'Xóa công việc thuê thành công.',
  })
  remove(@Param('id') id: string) {
    return this.hireJobsService.remove(+id);
  }
}
