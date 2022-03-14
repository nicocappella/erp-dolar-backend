import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOperatorDto } from './dto/createOperator.dto';
import { OperatorService } from './operator.service';
import { Operator } from './schema/operator.schema';

@Controller('operator')
export class OperatorController {
  constructor(private operatorService: OperatorService) {}
  @Get()
  async getOperators(): Promise<Operator[]> {
    return this.operatorService.findAll();
  }
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.operatorService.findOne(id);
  }
  @Post()
  async createOperator(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.createOne(createOperatorDto);
  }
}
