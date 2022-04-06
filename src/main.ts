import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as csurf from 'csurf';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { CookieAuthenticationGuard } from './auth/guards/cookie-authentication.guard';
const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    },
  });
  const configService = app.get(ConfigService);
  const mongoUsername = configService.get<string>('MONGO_USERNAME');
  const mongoPort = configService.get<number>('MONGO_PORT');
  const mongoDbName = configService.get<string>('MONGO_DATABASE');
  const sessionSecret = configService.get<string>('SESSION_SECRET');
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(helmet());
  app.use(
    session({
      name: 'nest-js-api',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        httpOnly: true,
        secure: false,
      },
      store: MongoStore.create({
        mongoUrl: `mongodb://${mongoUsername}:${mongoPort}`,
        dbName: mongoDbName,
        collectionName: 'sessions',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(csurf());console.log(res);
  await app.listen(4000);
}
bootstrap();
