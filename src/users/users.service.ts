import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    try {
      // Kiểm tra xem email có trùng không
      const existingEmail = await this.prisma.nguoiDung.findFirst({
        where: { email: createUserDto.email },
      });
      if (existingEmail) {
        throw new Error('Email already exists');
      }
  
      // Kiểm tra xem id có trùng không
      const existingId = await this.prisma.nguoiDung.findFirst({
        where: { id: createUserDto.id },
      });
      if (existingId) {
        throw new Error('User ID already exists');
      }
  
      // Kiểm tra xem số điện thoại có trùng không
      const existingPhone = await this.prisma.nguoiDung.findFirst({
        where: { phone: createUserDto.phone },
      });
      if (existingPhone) {
        throw new Error('Phone number already exists');
      }
  
      // Tạo người dùng mới nếu không có lỗi trùng lặp
      const createdUser = await this.prisma.nguoiDung.create({
        data: {
          id: createUserDto.id,
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          phone: createUserDto.phone,
          birth_day: createUserDto.birthDay || null,
          gender: createUserDto.gender,
          role: createUserDto.role,
          skill: createUserDto.skill || null,
          certification: createUserDto.certification || null,
        },
      });
  
      return createdUser;
    } catch (error) {
      // Ném lỗi nếu có vấn đề
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  
  

  async findAllWithPaginationAndSearch({
    page = 1,
    limit = 10,  // Mặc định là 10 nếu không có limit
    keyword = '',
  }: {
    page?: number;
    limit?: number;
    keyword: string;
  }): Promise<{ data: UserDto[]; total: number }> {
    // Kiểm tra và đảm bảo limit là số và hợp lệ
    const effectiveLimit = limit && limit > 0 ? Number(limit) : 10; // Nếu limit không hợp lệ, dùng 10
  
    // Tính toán skip dựa trên page và limit
    const skip = (page - 1) * effectiveLimit;
  
    // Xây dựng điều kiện tìm kiếm nếu có keyword
    const whereCondition = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { email: { contains: keyword, mode: 'insensitive' } },
            { phone: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {};
  
    try {
      const [data, total] = await Promise.all([
        this.prisma.nguoiDung.findMany({
          where: whereCondition,
          skip,
          take: effectiveLimit,  // Chỉ sử dụng số nguyên cho `take`
        }),
        this.prisma.nguoiDung.count({ where: whereCondition }),  // Đếm tổng số bản ghi
      ]);
  
      // Chuyển đổi dữ liệu sang UserDto
      const userDtos = data.map(user => plainToClass(UserDto, user));
  
      return { data: userDtos, total };
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  }
  
  
  
  // Get user by ID
  async findOne(id: number) {
    try {
      const user = await this.prisma.nguoiDung.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user with ID ${id}: ${error.message}`);
    }
  }

  // Update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.nguoiDung.update({
        where: { id },
        data: {
          id: updateUserDto.id,
          name: updateUserDto.name,
          email: updateUserDto.email,
          phone: updateUserDto.phone,
          birth_day: updateUserDto.birthDay,
          gender: updateUserDto.gender,
          role: updateUserDto.role,
          skill: updateUserDto.skill,
          certification: updateUserDto.certification,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user with ID ${id}: ${error.message}`);
    }
  }

  // Delete user
  async remove(id: number) {
    try {
      await this.prisma.nguoiDung.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  }
}
