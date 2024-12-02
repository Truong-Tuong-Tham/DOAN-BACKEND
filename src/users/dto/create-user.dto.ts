import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique identifier for the user',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: '',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: '',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: '',
  })
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '',
  })
  phone: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '', // Định dạng ISO 8601 cho ngày tháng
  })
  birthDay: Date;

  @ApiProperty({
    description: 'The gender of the user (e.g. male, female, other)',
    example: '',
  })
  gender: string;

  @ApiProperty({
    description: 'The role assigned to the user (e.g. admin, user)',
    example: '',
  })
  role: string;

  @ApiProperty({
    description: 'The user’s skills (optional)',
    example: '',
    required: false, // Optional field
  })
  skill?: string;

  @ApiProperty({
    description: 'The user’s certifications (optional)',
    example: '',
    required: false, // Optional field
  })
  certification?: string;
}
