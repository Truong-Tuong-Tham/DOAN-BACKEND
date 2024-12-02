import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateDetailTypeJobDto {
  @ApiProperty({
    description: 'Tên chi tiết công việc',
    example: 'Thiết kế website',
    required: false, // Trường này là tùy chọn
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsString() // Đảm bảo giá trị là một chuỗi nếu có
  ten_chi_tiet?: string;

  @ApiProperty({
    description: 'Đường dẫn hình ảnh cho chi tiết công việc',
    example: 'https://example.com/image.jpg',
    required: false, // Trường này là tùy chọn
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsUrl() // Đảm bảo giá trị là một URL hợp lệ nếu có
  hinh_anh?: string;

  @ApiProperty({
    description: 'Mã loại công việc',
    example: 1,
    required: false, // Trường này là tùy chọn
  })
  @IsOptional() // Đánh dấu trường này là tùy chọn
  @IsInt() // Đảm bảo giá trị là một số nguyên nếu có
  ma_loai_cong_viec?: number;
}

export class UpdateJobTypeCodeDto {
  @ApiProperty({
    description: 'ID của đối tượng cần cập nhật',
    example: 1,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Mã loại công việc mới',
    example: 2,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  ma_loai_cong_viec: number;
}
