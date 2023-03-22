import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';
import { SessionSerializer } from './services/session.serializer';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
