// user.dto.ts
import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  phone: string;

  @Expose()
  birthDay: Date;

  @Expose()
  gender: string;

  @Exclude()
  role: string;

  @Expose()
  skill?: string;

  @Expose()
  certification?: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
