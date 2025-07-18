/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Exclude()
export class BlogJsonDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  writer: string;

  @Expose()
  tags: string[];

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  //   @Expose()
  //   @Type(() => UserJsonDto)
  //   user: CreateUserDto;

  @Expose()
  @Transform(({ value }) => value.id)
  user: User;
}
