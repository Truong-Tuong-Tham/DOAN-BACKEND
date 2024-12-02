import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CongViec, PrismaClient } from '@prisma/client';



@Injectable()
export class CongViecService {
  constructor() {}
prisma = new PrismaClient();
  // Tạo mới một công việc
  async create(createCongViecDto: CreateJobDto) {
    return this.prisma.congViec.create({
      data: createCongViecDto,
    });
  }

  // Lấy danh sách công việc với phân trang và tìm kiếm
  async findAllWithPaginationAndSearch({
    page = 1,
    limit = 10,
    keyword = '',
  }: {
    page: number;
    limit: number;
    keyword: string;
  }) {
    const skip = (page - 1) * limit;
    const take = Number(limit); // Chuyển limit thành số
  
    const where = keyword
      ? {
          OR: [
            { ten_cong_viec: { contains: keyword, mode: 'insensitive' } },
            { mo_ta_ngan: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {};
  
    const [data, total] = await Promise.all([
      this.prisma.congViec.findMany({
        where,
        skip,
        take, // Đúng: truyền giá trị kiểu Int
        orderBy: { id: 'desc' },
      }),
      this.prisma.congViec.count({ where }),
    ]);
  
    return { data, total };
  }
  

  // Lấy thông tin chi tiết một công việc
  async findOne(id: number) {
    const congViec = await this.prisma.congViec.findUnique({
      where: { id },
      include: {
        BinhLuan: true,
        ChiTietLoaiCongViec: true,
       
      },
    });

    if (!congViec) {
      throw new NotFoundException(`Không tìm thấy công việc với ID ${id}`);
    }

    return congViec;
  }

  // Cập nhật thông tin một công việc
  async update(id: number, updateCongViecDto: UpdateJobDto) {
    const congViec = await this.prisma.congViec.findUnique({ where: { id } });
    if (!congViec) {
      throw new NotFoundException(`Không tìm thấy công việc với ID ${id}`);
    }

    return this.prisma.congViec.update({
      where: { id },
      data: updateCongViecDto,
    });
  }

  // Xóa một công việc
  async remove(id: number) {
    const congViec = await this.prisma.congViec.findUnique({ where: { id } });
    if (!congViec) {
      throw new NotFoundException(`Không tìm thấy công việc với ID ${id}`);
    }

    return this.prisma.congViec.delete({
      where: { id },
    });
  }
  
async findJobById(id: string): Promise<CongViec | null> {
  return await this.prisma.congViec.findUnique({
    where: { id: parseInt(id) },
  });
}

async updateJobImage(id: string, image: string): Promise<CongViec> {
  return await this.prisma.congViec.update({
    where: { id: parseInt(id) },
    data: { hinh_anh: image },
  });
}
async updateJobImageCloud(id: string, imageUrl: string): Promise<void> {
  await this.prisma.congViec.update({
    where: { id: parseInt(id) },
    data: { hinh_anh: imageUrl },
  });
}

}
