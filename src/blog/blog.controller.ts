import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  InternalServerErrorException,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create_blog.dto';
import { UpdateBlogDto } from './dto/update_blog.dto';
import { plainToInstance } from 'class-transformer';
import { BlogJsonDto } from './dto/blog.dto';
import { JWTPassportGuard } from 'src/auth/guards/jwt_passport.guard';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
      const { data, total } = await this.blogService.findAll({
        page: pageNumber,
        limit: limitNumber,
      });

      return {
        total,
        data: data.map((blog) => plainToInstance(BlogJsonDto, blog)),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @UseGuards(JWTPassportGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateBlogDto) {
    try {
      const blog = await this.blogService.create(createUserDto);
      return plainToInstance(BlogJsonDto, blog);
    } catch {
      throw new InternalServerErrorException('Failed to create blog');
    }
  }

  @UseGuards(JWTPassportGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const blog = await this.blogService.findOne(+id);
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return plainToInstance(BlogJsonDto, blog);
  }

  @UseGuards(JWTPassportGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateBlogDto) {
    console.log(updateUserDto);
    const blog = await this.blogService.update(parseInt(id), updateUserDto);
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return plainToInstance(BlogJsonDto, blog);
  }

  @UseGuards(JWTPassportGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.blogService.remove(+id);
      return {
        message: `Deleted Blog (#${id})`,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
}
