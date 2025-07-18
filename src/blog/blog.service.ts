import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create_blog.dto';
import { UpdateBlogDto } from './dto/update_blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private userService: UserService,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const user = await this.userService.findOne(
      parseInt(createBlogDto.user_id),
    );
    if (!user) {
      throw new NotFoundException('No User Found');
    }
    const blog = this.blogRepository.create({
      ...createBlogDto,
      user,
    });
    return await this.blogRepository.save(blog);
  }

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<{ data: Blog[]; total: number }> {
    const [data, total] = await this.blogRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Blog | null> {
    return await this.blogRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog | null> {
    await this.blogRepository.update(id, updateBlogDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}
