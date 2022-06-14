import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as csurf from 'csurf';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { CookieAuthenticationGuard } from './auth/guards/cookie-authentication.guard';
import { connection } from 'mongoose';
const MongoStore = require('connect-mongo');
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // {
    //   cors: {
    //     credentials: true,
    //     origin: ['http://localhost:3000'],
    //     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    //   },
    // }
  );
  // const apiProx = createProxyMiddleware({
  //   target: 'http://3.84.220.161:4000/api/',
  //   changeOrigin: true,
  // });
  // app.use(apiProx);
  app.enableCors({
    origin: 'https://erp-dolar-frontend.vercel.app/',
    credentials: true,
    methods: [' GET', 'POST', 'PATCH', 'DELETE'],
  });
  const configService = app.get(ConfigService);
  const mongoUsername = configService.get<string>('MONGO_USERNAME');
  const mongoPassword = configService.get<string>('MONGO_PASSWORD');
  const mongoPort = configService.get<number>('MONGO_PORT');
  const mongoDbName = configService.get<string>('MONGO_DATABASE');
  const mongoConnection = configService.get<string>('MONGO_URI');
  const sessionSecret = configService.get<string>('SESSION_SECRET');
  const enviroment = configService.get('NODE_ENV');
  const uri =
    enviroment === 'development'
      ? `${mongoConnection}://${mongoUsername}:${mongoPort}`
      : `${mongoConnection}://${mongoUsername}:${mongoPassword}@${mongoDbName}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
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
        mongoUrl: uri,
        dbName: mongoDbName,
        collectionName: 'sessions',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(csurf());console.log(res);
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
