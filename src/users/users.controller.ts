import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('NguoiDung')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  // Create a new user

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) : Promise<Response<UserDto>> {
    try {
      // Create a user using the data from the body
      const createdUser = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully!',
        data: createdUser,
      });
    } catch (error) {
      throw new HttpException(
        `Error creating user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all')
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number for pagination',
    example: 1,  // Đặt mặc định là 1 cho page
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of users per page',
    example: 10,  // Đặt mặc định là 10 cho limit
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: 'Search keyword for filtering users',
    example: '',
  })
  async findAll(
    @Query('page') page: number = 1,  // Mặc định page là 1
    @Query('limit') limit: number = 10,  // Mặc định limit là 10
    @Query('keyword') keyword: string = '',  // Mặc định là chuỗi rỗng
    @Res() res: Response,
  ): Promise<Response<UserDto[]>> {
    try {
      // Gọi service để lấy dữ liệu
      const result = await this.usersService.findAllWithPaginationAndSearch({
        page,
        limit,
        keyword,
      });
  
      // Trả về dữ liệu và thông tin phân trang
      return res.status(HttpStatus.OK).json({
        message: 'User list retrieved successfully!',
        data: result.data,
        pagination: {
          total: result.total,
          currentPage: page,
          limit: limit,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error retrieving users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  // Get user by ID
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return res.status(HttpStatus.OK).json({
        message: 'User retrieved successfully!',
        data: user,
      });
    } catch (error) {
      throw new HttpException(
        `Error retrieving user with ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update user
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.usersService.update(+id, updateUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User updated successfully!',
        data: updatedUser,
      });
    } catch (error) {
      throw new HttpException(
        `Error updating user with ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete user
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      // Ensure that the user exists before attempting deletion
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      
      // Proceed with deletion if the user exists
      await this.usersService.remove(+id);
      return res.status(HttpStatus.OK).json({
        message: 'User deleted successfully!',
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting user with ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
