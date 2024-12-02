import { Injectable, NotFoundException } from '@nestjs/common';
import { ChiTietLoaiCongViec, PrismaClient } from '@prisma/client';
import { CreateDetailTypeJobDto } from './dto/create-detail-type-job.dto';
import { UpdateDetailTypeJobDto } from './dto/update-detail-type-job.dto';

@Injectable()
export class DetailTypeJobService {
  constructor() {}
  prisma = new PrismaClient();

  async create(createDetailTypeJobDto: CreateDetailTypeJobDto) {
    try {
      return await this.prisma.chiTietLoaiCongViec.create({
        data: createDetailTypeJobDto,
      });
    } catch (error) {
      throw new Error('Không thể tạo chi tiết công việc mới.');
    }
  }

  async findAll(page: number = 1, limit: number = 10, search: string = '') {
    const skip = (page - 1) * limit;
    const where = search ? {
      ten_chi_tiet: { contains: search },
    } : {};
    return this.prisma.chiTietLoaiCongViec.findMany({
      where,
      skip,
      take: limit,
    });
  }

  async findByCategory(ma_loai_cong_viec: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.chiTietLoaiCongViec.findMany({
      where: { ma_loai_cong_viec },
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const jobDetail = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id },
    });
    if (!jobDetail) {
      throw new NotFoundException('Chi tiết công việc không tồn tại');
    }
    return jobDetail;
  }

  async update(id: number, updateDetailTypeJobDto: UpdateDetailTypeJobDto) {
    try {
      return await this.prisma.chiTietLoaiCongViec.update({
        where: { id },
        data: updateDetailTypeJobDto,
      });
    } catch (error) {
      throw new NotFoundException('Không thể cập nhật chi tiết công việc');
    }
  }

  async updateJobTypeCode(id: number, ma_loai_cong_viec_new: number): Promise<void> {
    const jobDetail = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id },
    });

    if (!jobDetail) {
      throw new NotFoundException('Đối tượng không tồn tại');
    }

    await this.prisma.chiTietLoaiCongViec.update({
      where: { id },
      data: { ma_loai_cong_viec: ma_loai_cong_viec_new },
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.chiTietLoaiCongViec.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Không thể xóa chi tiết công việc');
    }
  }
  async findJobById(id: string): Promise<ChiTietLoaiCongViec | null> {
    return await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id: parseInt(id) },
    });
  }
  
  async updateJobImage(id: string, image: string): Promise<ChiTietLoaiCongViec> {
    return await this.prisma.chiTietLoaiCongViec.update({
      where: { id: parseInt(id) },
      data: { hinh_anh: image },
    });
  }
  async updateJobImageCloud(id: string, imageUrl: string): Promise<void> {
    await this.prisma.chiTietLoaiCongViec.update({
      where: { id: parseInt(id) },
      data: { hinh_anh: imageUrl },
    });
  }
}
