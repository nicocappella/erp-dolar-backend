import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
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
  async getOperator(@Param('id') id: string) {
    return this.operatorService.findById(id);
  }
  @Post()
  async createOperator(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.createOne(createOperatorDto);
  }
  @Patch(':id')
  async updateOperator(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.operatorService.updateOne(id, updateOperatorDto);
  }
  @Delete(':id')
  async deleteOperator(@Param('id') id: string) {
    return this.operatorService.deleteOne(id);
  }
}
