import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserJsonDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
