import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';

describe('Math Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MathController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MathController = module.get<MathController>(MathController);
    expect(controller).toBeDefined();
  });
});
