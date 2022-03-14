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
        const port = configService.get('MONGO_PORT');
        const database = configService.get('MONGO_DATABASE');
        // const host = configService.get('MONGO_HOST');

        return {
          uri: `mongodb://${username}:${port}`, //@${host}
          dbName: database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
