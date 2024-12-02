import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('BinhLuan')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Thêm bình luận
  @Post()
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Bình luận được tạo thành công.',
  })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // Lấy danh sách bình luận
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Danh sách bình luận.',
  })
  findAll() {
    return this.commentService.findAll();
  }

  // Tìm bình luận theo ID
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID của bình luận' })
  @ApiResponse({
    status: 200,
    description: 'Bình luận tìm thấy.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bình luận.',
  })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  // Tìm bình luận theo mã công việc
  @Get('/job/:ma_cong_viec')
  @ApiParam({ name: 'ma_cong_viec', description: 'Mã công việc' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách bình luận của công việc.',
  })
  findByJob(@Param('ma_cong_viec') ma_cong_viec: string) {
    return this.commentService.findByJob(+ma_cong_viec);
  }

  // Cập nhật bình luận
  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID của bình luận' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bình luận thành công.',
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  // Xóa bình luận
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID của bình luận' })
  @ApiResponse({
    status: 200,
    description: 'Xóa bình luận thành công.',
  })
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
