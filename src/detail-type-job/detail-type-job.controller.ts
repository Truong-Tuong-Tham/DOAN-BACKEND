import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res, HttpStatus, UploadedFiles } from '@nestjs/common';
import { DetailTypeJobService } from './detail-type-job.service';
import { CreateDetailTypeJobDto, FindAllDetailTypeJobDto } from './dto/create-detail-type-job.dto';
import { UpdateDetailTypeJobDto, UpdateJobTypeCodeDto } from './dto/update-detail-type-job.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { filesUpLoadDto, fileUpLoadDto } from 'src/job/dto/create-job.dto';
import { getStorageOptions } from 'src/shared/upload.service';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { Response } from 'express';

@ApiTags('ChiTietLoaiCongViec')
@Controller('detail-type-job')

export class DetailTypeJobController {
  constructor(private readonly detailTypeJobService: DetailTypeJobService,
  private readonly cloudUploadService:CloudUploadService
  ) {}

  @Post()
  create(@Body() createDetailTypeJobDto: CreateDetailTypeJobDto) {
    return this.detailTypeJobService.create(createDetailTypeJobDto);
  }

  @Get()
  findAll(@Query() query: FindAllDetailTypeJobDto) {
    const { page = 1, limit = 10, search = '' } = query;
    return this.detailTypeJobService.findAll(page, limit, search);
  }
  
  @Get('ma-loai-cong-viec/:ma_loai_cong_viec')
  findByCategory(
    @Param('ma_loai_cong_viec') ma_loai_cong_viec: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.detailTypeJobService.findByCategory(ma_loai_cong_viec, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailTypeJobService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDetailTypeJobDto: UpdateDetailTypeJobDto
  ) {
    return this.detailTypeJobService.update(+id, updateDetailTypeJobDto);
  }

  @Patch('update-job-type-code')
  @ApiResponse({
    status: 200,
    description: 'Mã loại công việc đã được cập nhật thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Đối tượng không tồn tại',
  })
  async updateJobTypeCode(
    @Body() updateJobTypeCodeDto: UpdateJobTypeCodeDto,
  ): Promise<void> {
    const { id, ma_loai_cong_viec } = updateJobTypeCodeDto;
    return this.detailTypeJobService.updateJobTypeCode(id, ma_loai_cong_viec);
  }
  @Post("upload-thumbnail/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: fileUpLoadDto, required: true })
  @UseInterceptors(
    FileInterceptor('hinhAnh', { storage: getStorageOptions('detail') }),
  )
  async uploadThumbnail(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    // Kiểm tra ID công việc
    const job = await this.detailTypeJobService.findJobById(id); // Dịch vụ tìm công việc
    if (!job) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Công việc với ID: ${id} không tồn tại`,
      });
    }
  
    // Cập nhật hinh_anh trong database
    const updatedJob = await this.detailTypeJobService.updateJobImage(id, file.filename);
  
    return res.status(HttpStatus.OK).json({
      message: `Upload hình ảnh cho công việc ID: ${id} thành công`,
      data: updatedJob,
    });
  }
  
  @Post("upload-multiple-thumbnail/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: filesUpLoadDto, required: true })
  @UseInterceptors(
    FilesInterceptor('hinhAnh', 10, { storage: getStorageOptions('detail') }),
  )
  async uploadMultipleThumbnail(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    // Kiểm tra ID công việc
    const job = await this.detailTypeJobService.findJobById(id);
    if (!job) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Công việc với ID: ${id} không tồn tại`,
        data: job,
      });
    }
  
    // Lưu danh sách hình ảnh
    const filenames = files.map(file => file.filename).join(';'); // Chuỗi các tên file
    const updatedJob = await this.detailTypeJobService.updateJobImage(id, filenames);
  
    return res.status(HttpStatus.OK).json({
      message: `Upload nhiều hình ảnh cho công việc ID: ${id} thành công`,
      data: updatedJob,
    });
  }
  
    
  @Post("upload-thumbnail-cloud/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: fileUpLoadDto, required: true })
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async uploadThumbnailCloud(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      // Kiểm tra ID công việc có tồn tại
      const job = await this.detailTypeJobService.findJobById(id);
      if (!job) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `Công việc với ID: ${id} không tồn tại.`,
        });
      }
  
      // Upload hình ảnh lên cloud
      const result = await this.cloudUploadService.upLoadImage(file, "detail");
      if (!result || !result.url) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Upload thất bại, không thể lấy URL hình ảnh.',
        });
      }
  
      // Cập nhật giá trị `hinh_anh` trong model `CongViec`
      await this.detailTypeJobService.updateJobImageCloud(id, result.url);
  
      // Phản hồi thành công
      return res.status(HttpStatus.OK).json({
        message: 'Upload hình ảnh lên cloud thành công.',
        imageUrl: result.url,
      });
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Có lỗi xảy ra khi upload hình ảnh.',
        error: error.message,
      });
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailTypeJobService.remove(+id);
  }
}
