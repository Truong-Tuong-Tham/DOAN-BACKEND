import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Res,

  UseInterceptors,
  UploadedFile,
  UploadedFiles,
 
} from '@nestjs/common';
import { Response } from 'express';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CongViecService } from './job.service';
import { CreateJobDto, filesUpLoadDto, fileUpLoadDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ExpressAdapter, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/upload.service';
import { File } from 'buffer';
import { use } from 'passport';
import { CloudUploadService } from 'src/shared/cloudUpload.service';

@ApiTags('CongViec')
@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService,
    private readonly cloudUploadService: CloudUploadService
  ) {}

  @Post()
  @ApiBody({ type: CreateJobDto })
  async create(
    @Body() createCongViecDto: CreateJobDto,
    @Res() res: Response,
  ) {
    try {
      const createdCongViec = await this.congViecService.create(createCongViecDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Công việc được tạo thành công!',
        data: createdCongViec,
      });
    } catch (error) {
      throw new HttpException(
        `Lỗi tạo công việc: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all')
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Số trang cho phân trang',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Số công việc trên mỗi trang',
    example: 10,
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: 'Từ khóa tìm kiếm',
    example: '',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('keyword') keyword: string = '',
    @Res() res: Response,
  ) {
    try {
      const result = await this.congViecService.findAllWithPaginationAndSearch({
        page,
        limit,
        keyword,
      });
      return res.status(HttpStatus.OK).json({
        message: 'Danh sách công việc được lấy thành công!',
        data: result.data,
        pagination: {
          total: result.total,
          currentPage: page,
          limit: limit,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Lỗi lấy danh sách công việc: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const congViec = await this.congViecService.findOne(+id);
      if (!congViec) {
        throw new HttpException(
          `Không tìm thấy công việc với ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return res.status(HttpStatus.OK).json({
        message: 'Lấy công việc thành công!',
        data: congViec,
      });
    } catch (error) {
      throw new HttpException(
        `Lỗi lấy công việc: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCongViecDto:UpdateJobDto,
    @Res() res: Response,
  ) {
    try {
      const updatedCongViec = await this.congViecService.update(+id, updateCongViecDto);
      return res.status(HttpStatus.OK).json({
        message: 'Cập nhật công việc thành công!',
        data: updatedCongViec,
      });
    } catch (error) {
      throw new HttpException(
        `Lỗi cập nhật công việc: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post("upload-thumbnail/:id")
@ApiConsumes('multipart/form-data')
@ApiBody({ type: fileUpLoadDto, required: true })
@UseInterceptors(
  FileInterceptor('hinhAnh', { storage: getStorageOptions('jobs') }),
)
async uploadThumbnail(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Res() res: Response,
) {
  // Kiểm tra ID công việc
  const job = await this.congViecService.findJobById(id); // Dịch vụ tìm công việc
  if (!job) {
    return res.status(HttpStatus.NOT_FOUND).json({
      message: `Công việc với ID: ${id} không tồn tại`,
    });
  }

  // Cập nhật hinh_anh trong database
  const updatedJob = await this.congViecService.updateJobImage(id, file.filename);

  return res.status(HttpStatus.OK).json({
    message: `Upload hình ảnh cho công việc ID: ${id} thành công`,
    data: updatedJob,
  });
}

@Post("upload-multiple-thumbnail/:id")
@ApiConsumes('multipart/form-data')
@ApiBody({ type: filesUpLoadDto, required: true })
@UseInterceptors(
  FilesInterceptor('hinhAnh', 10, { storage: getStorageOptions('jobs') }),
)
async uploadMultipleThumbnail(
  @Param('id') id: string,
  @UploadedFiles() files: Express.Multer.File[],
  @Res() res: Response,
) {
  // Kiểm tra ID công việc
  const job = await this.congViecService.findJobById(id);
  if (!job) {
    return res.status(HttpStatus.NOT_FOUND).json({
      message: `Công việc với ID: ${id} không tồn tại`,
    });
  }

  // Lưu danh sách hình ảnh
  const filenames = files.map(file => file.filename).join(';'); // Chuỗi các tên file
  const updatedJob = await this.congViecService.updateJobImage(id, filenames);

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
    const job = await this.congViecService.findJobById(id);
    if (!job) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Công việc với ID: ${id} không tồn tại.`,
      });
    }

    // Upload hình ảnh lên cloud
    const result = await this.cloudUploadService.upLoadImage(file, "jobs");
    if (!result || !result.url) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Upload thất bại, không thể lấy URL hình ảnh.',
      });
    }

    // Cập nhật giá trị `hinh_anh` trong model `CongViec`
    await this.congViecService.updateJobImageCloud(id, result.url);

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
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.congViecService.remove(+id);
      return res.status(HttpStatus.OK).json({
        message: 'Xóa công việc thành công!',
      });
    } catch (error) {
      throw new HttpException(
        `Lỗi xóa công việc: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
