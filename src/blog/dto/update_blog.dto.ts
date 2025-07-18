import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create_blog.dto';

export class UpdateBlogDto extends OmitType(PartialType(CreateBlogDto), [
  'user_id',
]) {}
