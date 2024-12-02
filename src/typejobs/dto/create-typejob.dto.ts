// create-typejob.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTypejobDto {
  @ApiProperty({
    description: 'The name of the job type',
    example: 'Software Development',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  ten_loai_cong_viec: string;  // Corresponds to 'ten_loai_cong_viec' in Prisma model
}


