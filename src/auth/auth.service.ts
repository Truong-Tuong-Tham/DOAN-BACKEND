import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(body: loginDto): Promise<string> {
    try {
      const { email, password } = body;
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid email');
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new BadRequestException('Invalid password');
      }

      const token = this.jwtService.sign(
        { data: { id: user.id } },
        {
          expiresIn: '1h',
          secret: this.configService.get('SECRET_KEY'),
        },
      );
      return token;
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }

  async register(body: RegisterDto): Promise<any> {
    try {
      const { name, email, password,  phone, gender } = body;

      // Check if email already exists
      const existingUser = await this.prisma.nguoiDung.findFirst({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await this.prisma.nguoiDung.create({
        data: {
          name,
          email,
          password: hashedPassword,
     
          phone,
          gender,
        },
      });

      return {
        id: newUser.id,
        email: newUser.email,
      };
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }
}
