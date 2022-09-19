import { Test, TestingModule } from '@nestjs/testing';
import { LenderController } from './lender.controller';

describe('LenderController', () => {
  let controller: LenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenderController],
    }).compile();

    controller = module.get<LenderController>(LenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
