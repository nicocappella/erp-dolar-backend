import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appContoller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appContoller = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Hello World!', () => {
      expect(appContoller.sayHello()).toBe('Hello World!');
    });
  });
});
