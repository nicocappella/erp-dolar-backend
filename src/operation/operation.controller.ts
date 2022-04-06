import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Get()
  async getOperations() {
    return this.operationService.findAll();
  }

  @Get(':id')
  async getOperation(@Param('id') id: string) {
    return this.operationService.findOne(id);
  }
  @Get('client/:id')
  async getByClient(@Param('id') client: string) {
    return this.operationService.findByClient(client);
  }
  @Get('operator/:id')
  async getByOperator(@Param('id') operator: string) {
    return this.operationService.findByOperator(operator);
  }

  @Post()
  async createPost(
    @Body() createOperationDto: CreateOperationDto,
    @Request() session: Record<string, any>,
  ) {
    console.log(session.id);
    return this.operationService.createOne(createOperationDto);
  }

  @Patch(':id')
  async updateOperation(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.updateOne(id, updateOperationDto);
  }

  @Delete(':id')
  async deleteOperation(@Param('id') id: string) {
    return this.operationService.deleteOne(id);
  }
  @Delete()
  async deleteOperations(@Body() ids: string[]) {
    return this.operationService.deleteMany(ids);
  }
}
