import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, Max, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the job that the comment is related to',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ma_cong_viec: number;   // Corresponds to ma_cong_viec in Prisma model

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 123,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ma_nguoi_binh_luan: number;   // Corresponds to ma_nguoi_binh_luan in Prisma model

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment content.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  noi_dung: string;   // Corresponds to noi_dung in Prisma model

  @ApiProperty({
    description: 'The rating for the comment (1 to 5 stars)',
    example: 4,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  sao_binh_luan: number;  // Corresponds to sao_binh_luan in Prisma model

  @ApiProperty({
    description: 'The date when the comment was made (optional)',
    example: '2024-12-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  ngay_binh_luan?: Date;  // Corresponds to ngay_binh_luan in Prisma model
}
