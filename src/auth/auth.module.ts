import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTPasswordStrategy } from './strategies/jwt_passport.strategy';
import AppConfigs from 'src/configs/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTPasswordStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: AppConfigs.jwt_secret,
      signOptions: { expiresIn: AppConfigs.jwt_expires_in },
    }),
  ],
})
export class AuthModule {}
