import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  private prisma = new PrismaClient();

  // Thêm bình luận
  async create(createCommentDto: CreateCommentDto) {
    const { ma_cong_viec, ma_nguoi_binh_luan, noi_dung, sao_binh_luan, ngay_binh_luan } = createCommentDto;
    
    try {
      const createdComment = await this.prisma.binhLuan.create({
        data: {
          ma_cong_viec,
          ma_nguoi_binh_luan,
          noi_dung,
          sao_binh_luan,
          ngay_binh_luan: ngay_binh_luan || new Date(), // Use the current date if not provided
        },
      });
      return createdComment;
    } catch (error) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  }

  // Lấy danh sách bình luận
  async findAll() {
    try {
      return await this.prisma.binhLuan.findMany({
        include: {
          CongViec: true,  // Include job details
          NguoiDung: true,  // Include user details
        },
      });
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
  }

  // Tìm bình luận theo ID
  async findOne(id: number) {
    const comment = await this.prisma.binhLuan.findUnique({
      where: { id },
      include: {
        CongViec: true,
        NguoiDung: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  // Tìm bình luận theo mã công việc
  async findByJob(ma_cong_viec: number) {
    return this.prisma.binhLuan.findMany({
      where: { ma_cong_viec },
      include: {
        CongViec: true,
        NguoiDung: true,
      },
    });
  }

  // Cập nhật bình luận
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const existingComment = await this.prisma.binhLuan.findUnique({ where: { id } });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.binhLuan.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  // Xóa bình luận
  async remove(id: number) {
    const comment = await this.prisma.binhLuan.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.binhLuan.delete({
      where: { id },
    });
  }
}
