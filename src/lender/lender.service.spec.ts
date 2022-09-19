import { Test, TestingModule } from '@nestjs/testing';
import { LenderService } from './lender.service';

describe('LenderService', () => {
  let service: LenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenderService],
    }).compile();

    service = module.get<LenderService>(LenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
