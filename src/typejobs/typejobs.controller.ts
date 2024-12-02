import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TypejobsService } from './typejobs.service';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('LoaiCongViec')
@Controller('typejobs')
export class TypejobsController {
  constructor(private readonly typejobsService: TypejobsService) {}

  @Post()
  @ApiBody({ type: CreateTypejobDto })
  @ApiResponse({
    status: 201,
    description: 'Loại công việc được tạo thành công.',
  })
  create(@Body() createTypejobDto: CreateTypejobDto) {
    return this.typejobsService.create(createTypejobDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Số lượng mỗi trang', type: Number })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm loại công việc', type: String })
  @ApiResponse({
    status: 200,
    description: 'Danh sách loại công việc.',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search: string = '',
  ) {
    return this.typejobsService.findAll(page, pageSize, search);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID của loại công việc' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin loại công việc.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy loại công việc.',
  })
  findOne(@Param('id') id: string) {
    return this.typejobsService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID của loại công việc' })
  @ApiBody({ type: UpdateTypejobDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật loại công việc thành công.',
  })
  update(@Param('id') id: string, @Body() updateTypejobDto: UpdateTypejobDto) {
    return this.typejobsService.update(+id, updateTypejobDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID của loại công việc' })
  @ApiResponse({
    status: 200,
    description: 'Loại công việc được xóa thành công.',
  })
  remove(@Param('id') id: string) {
    return this.typejobsService.remove(+id);
  }
}
