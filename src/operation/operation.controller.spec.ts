import { Test, TestingModule } from '@nestjs/testing';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';

describe('OperationController', () => {
  let operationController: OperationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OperationController],
      providers: [OperationService],
    }).compile();
    operationController = app.get<OperationController>(OperationController);
  });

  describe('root', () => {
    it('should return Hello World!', () => {
      expect(operationController.getOperations()).toBe();
    });
  });
});
