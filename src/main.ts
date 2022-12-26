import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as csurf from 'csurf';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
const MongoStore = require('connect-mongo');
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://erp-dolar-frontend.vercel.app',
      'https://main.d3t0dsf10bwzod.amplifyapp.com/',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  app.set('trust proxy', 1);
  const configService = app.get(ConfigService);
  const mongoUsername = configService.get<string>('MONGO_USERNAME');
  const mongoPassword = configService.get<string>('MONGO_PASSWORD');
  const mongoPort = configService.get<number>('MONGO_PORT');
  const mongoDbName = configService.get<string>('MONGO_DATABASE');
  const mongoConnection = configService.get<string>('MONGO_URI');
  const sessionSecret = configService.get<string>('SESSION_SECRET');
  const enviroment = configService.get<string>('NODE_ENV');
  const uri =
    enviroment === 'development'
      ? `${mongoConnection}://${mongoUsername}:${mongoPort}`
      : `${mongoConnection}://${mongoUsername}:${mongoPassword}@${mongoDbName}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
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
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        httpOnly: true,
        secure: enviroment === 'development' ? false : true,
        sameSite: 'none',
      },
      store: MongoStore.create({
        mongoUrl: uri,
        dbName: mongoDbName,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60,
        autoRemove: 'native',
        stringify: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(csurf());
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
