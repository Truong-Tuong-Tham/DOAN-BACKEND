import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTypejobDto } from './dto/create-typejob.dto';
import { UpdateTypejobDto } from './dto/update-typejob.dto';

@Injectable()
export class TypejobsService {
  private prisma = new PrismaClient();

  // Thêm loại công việc mới
  create(createTypejobDto: CreateTypejobDto) {
    return this.prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: createTypejobDto.ten_loai_cong_viec,
      },
    });
  }

  // Lấy danh sách loại công việc (có phân trang và tìm kiếm)
  async findAll(page: number = 1, pageSize: number = 10, search: string = '') {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const whereCondition = search
      ? {
          ten_loai_cong_viec: {
            contains: search,
            mode: 'insensitive', // Không phân biệt chữ hoa chữ thường khi tìm kiếm
          },
        }
      : {};

    return this.prisma.loaiCongViec.findMany({
      where: whereCondition,
      skip,
      take,
    });
  }

  // Tìm loại công việc theo ID
  findOne(id: number) {
    return this.prisma.loaiCongViec.findUnique({
      where: { id },
    });
  }

  // Cập nhật loại công việc
  update(id: number, updateTypejobDto: UpdateTypejobDto) {
    return this.prisma.loaiCongViec.update({
      where: { id },
      data: updateTypejobDto,
    });
  }

  // Xóa loại công việc
  remove(id: number) {
    return this.prisma.loaiCongViec.delete({
      where: { id },
    });
  }
}
