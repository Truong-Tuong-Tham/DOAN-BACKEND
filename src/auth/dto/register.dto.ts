import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsDate, IsOptional, IsPhoneNumber, IsEnum } from "class-validator";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;


  @ApiProperty({
    description: 'The email address of the user',
    example: 'example@example.com',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({
    description: 'The password for the user account',
    example: 'strongPassword123',
  })
  password: string;



  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be male, female, or other' })
  @ApiProperty({
    description: 'The gender of the user',
    example: 'male', // male, female, or other
    enum: Gender,
    required: false,
  })
  gender?: Gender;
}
