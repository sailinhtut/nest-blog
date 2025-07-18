import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  NotFoundException,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserJsonDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { JWTPassportGuard } from 'src/auth/guards/jwt_passport.guard';

@UseGuards(JWTPassportGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // async create(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     const user = await this.userService.create(createUserDto);
  //     return plainToInstance(UserJsonDto, user);
  //   } catch {
  //     throw new InternalServerErrorException('Failed to create user');
  //   }
  // }

  @Get()
  async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    try {
      const { data, total } = await this.userService.findAll({
        page: pageNumber,
        limit: limitNumber,
      });

      return {
        total,
        data: data.map((user) => plainToInstance(UserJsonDto, user)),
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return plainToInstance(UserJsonDto, user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const user = await this.userService.update(parseInt(id), updateUserDto);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return plainToInstance(UserJsonDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        message: `Deleted User (#${id})`,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
}
