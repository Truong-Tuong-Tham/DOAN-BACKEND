// update-typejob.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTypejobDto {
  @ApiProperty({
    description: 'The name of the job type',
    example: 'Web Development',
    required: false,
  })
  @IsOptional()
  @IsString()
  ten_loai_cong_viec?: string;  // Corresponds to 'ten_loai_cong_viec' in Prisma model
}