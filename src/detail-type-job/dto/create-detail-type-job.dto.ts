import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDetailTypeJobDto {
  @ApiProperty({
    description: 'The name of the detail type job',
    example: 'Detail Job Example', // Example for name
    required: true,
  })
  @IsString() // Ensures the value is a string
  ten_chi_tiet: string;

  @ApiProperty({
    description: 'The image URL associated with the detail type job',
    example: 'https://example.com/image.jpg', // Example for image URL
    required: true,
  })
  @IsString() // Ensures the value is a string
  hinh_anh: string;

  @ApiProperty({
    description: 'The job category identifier this detail type job belongs to',
    example: 1, // Example for job category ID
    required: true,
  })
  @IsInt() // Ensures the value is an integer
  ma_loai_cong_viec: number;
}

export class FindAllDetailTypeJobDto {
  @ApiProperty({
    description: 'Số trang dùng để phân trang',
 
    required: false,
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsInt() // Đảm bảo giá trị là một số nguyên nếu có
  @Transform(({ value }) => {
    // Chỉ chuyển đổi nếu giá trị là một số hợp lệ
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? undefined : parsedValue; // Nếu không phải số hợp lệ, trả về undefined
  })
  page?: number;

  @ApiProperty({
    description: 'Giới hạn số mục mỗi trang',

    required: false,
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsInt() // Đảm bảo giá trị là một số nguyên nếu có
  @Transform(({ value }) => {
    // Chỉ chuyển đổi nếu giá trị là một số hợp lệ
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? null : parsedValue; // Nếu không phải số hợp lệ, trả về undefined
  })
  limit?: number;

  @ApiProperty({
    description: 'Một chuỗi tìm kiếm để lọc các công việc chi tiết',

    required: false,
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsString() // Đảm bảo giá trị là chuỗi nếu có
  search?: string;
}