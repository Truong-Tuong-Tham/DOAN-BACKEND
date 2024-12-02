import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max, IsUrl } from 'class-validator';
import exp from 'constants';
import { format } from 'path';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  ten_cong_viec: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  danh_gia?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  gia_tien?: number;

  @IsOptional()
  @IsUrl()
  hinh_anh?: string;

  @IsOptional()
  @IsString()
  mo_ta?: string;

  @IsOptional()
  @IsString()
  mo_ta_ngan?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  sao_cong_viec?: number;

  @IsOptional()
  @IsInt()
  ma_chi_tiet_loai?: number;

  @IsOptional()
  @IsInt()
  nguoi_tao?: number;
}
export class fileUpLoadDto  {
  @ApiProperty({type:'string',format:"binary"})
  
  hinhAnh:any;
}
//define dto up nhieu hinh 
export class filesUpLoadDto {
  @ApiProperty({type:'array',items:{type:'string',format:"binary"}})
  
  hinhAnh:any[];
}


