import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const port = configService.get('MONGO_PORT');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        const enviroment = configService.get('NODE_ENV');
        const connection = configService.get('MONGO_URI');
        const uri =
          enviroment === 'development'
            ? `${connection}://${username}:${port}`
            : `${connection}://${username}:${password}@${database}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
        return {
          uri,
          dbName: database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
