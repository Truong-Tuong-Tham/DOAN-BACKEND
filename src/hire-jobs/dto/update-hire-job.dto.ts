import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsDateString, IsBoolean } from 'class-validator';

export class UpdateHireJobDto {
  @ApiProperty({
    description: 'The ID of the job being hired',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ma_cong_viec?: number;

  @ApiProperty({
    description: 'The ID of the user who is hiring the job',
    example: 123,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ma_nguoi_thue?: number;

  @ApiProperty({
    description: 'The date when the job is hired',
    example: '2024-12-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  ngay_thue?: Date;

  @ApiProperty({
    description: 'Whether the job is completed',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  hoan_thanh?: boolean;
}