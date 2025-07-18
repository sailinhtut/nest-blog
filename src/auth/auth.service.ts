import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserJsonDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, pass }: { email: string; pass: string }) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Wrong Password');
    }

    const token = this.generateToken({ id: user.id, email: email });
    const json = plainToInstance(UserJsonDto, user);
    return {
      ...json,
      token: token,
    };
  }

  async register(data: CreateUserDto) {
    const user = await this.userService.create(data);
    const token = this.generateToken({ id: user.id, email: user.email });
    const json = plainToInstance(UserJsonDto, user);
    return {
      ...json,
      token: token,
    };
  }

  generateToken({ id, email }: { id: number; email: string }): string {
    const token = this.jwtService.sign({
      id: id,
      email: email,
    });
    return token;
  }
}
