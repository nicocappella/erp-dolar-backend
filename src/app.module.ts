import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { OperatorModule } from './operator/operator.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { OperationModule } from './operation/operation.module';
import { CurrencyModule } from './currency/currency.module';
import { BalanceModule } from './balance/balance.module';
import { MovementModule } from './movement/movement.module';
import { PassportModule } from '@nestjs/passport';
import { NODE_ENV } from './app.constants';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    OperatorModule,
    ClientModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_DATABASE: Joi.string().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
      }),
    }),
    PassportModule.register({
      session: true,
    }),
    AuthModule,
    OperationModule,
    CurrencyModule,
    BalanceModule,
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
