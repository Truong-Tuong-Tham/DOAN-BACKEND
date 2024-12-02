import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';

@Injectable()
export class HireJobsService {
  private prisma = new PrismaClient();

  // Thêm công việc thuê
  async create(createHireJobDto: CreateHireJobDto) {
    const { ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh } = createHireJobDto;
    
    try {
      const createdHireJob = await this.prisma.thueCongViec.create({
        data: {
          ma_cong_viec,
          ma_nguoi_thue,
          ngay_thue: ngay_thue || new Date(), // Use the current date if not provided
          hoan_thanh: hoan_thanh ?? false,  // Default to false if not provided
        },
      });
      return createdHireJob;
    } catch (error) {
      throw new Error(`Error creating hire job: ${error.message}`);
    }
  }

  // Lấy danh sách công việc thuê
  async findAll() {
    try {
      return await this.prisma.thueCongViec.findMany({
        include: {
          CongViec: true,  // Include job details
          NguoiDung: true,  // Include user details
        },
      });
    } catch (error) {
      throw new Error(`Error fetching hire jobs: ${error.message}`);
    }
  }

  // Tìm công việc thuê theo ID
  async findOne(id: number) {
    const hireJob = await this.prisma.thueCongViec.findUnique({
      where: { id },
      include: {
        CongViec: true,
        NguoiDung: true,
      },
    });

    if (!hireJob) {
      throw new NotFoundException(`Hire job with ID ${id} not found`);
    }

    return hireJob;
  }

  // Cập nhật công việc thuê
  async update(id: number, updateHireJobDto: UpdateHireJobDto) {
    const existingHireJob = await this.prisma.thueCongViec.findUnique({ where: { id } });

    if (!existingHireJob) {
      throw new NotFoundException(`Hire job with ID ${id} not found`);
    }

    return this.prisma.thueCongViec.update({
      where: { id },
      data: updateHireJobDto,
    });
  }

  // Xóa công việc thuê
  async remove(id: number) {
    const hireJob = await this.prisma.thueCongViec.findUnique({ where: { id } });

    if (!hireJob) {
      throw new NotFoundException(`Hire job with ID ${id} not found`);
    }

    return this.prisma.thueCongViec.delete({
      where: { id },
    });
  }
}
