import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Đảm bảo rằng ValidationPipe được bật toàn cầu cho tất cả các DTO
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('API Fiverr')  // Đặt tiêu đề cho tài liệu API
    .setDescription('Danh sách API của Fiverr')  // Mô tả chi tiết về API
    .setVersion('1.0')  // Phiên bản của API

    .addBearerAuth()  // Cấu hình đăng truy cập bằng token
    .build();

  // Tạo tài liệu Swagger
  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger);
  
  // Cấu hình Swagger tại đường dẫn '/api'
  SwaggerModule.setup('api', app, swaggerDocument);

  // Lắng nghe trên cổng 3001 hoặc cổng từ biến môi trường
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
