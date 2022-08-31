import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './schema/balance.schema';

@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async findBalances(): Promise<Balance[]> {
    return this.balanceService.findAll();
  }

  @Get(':id')
  async findBalance(@Param('id') id: string): Promise<Balance> {
    return this.balanceService.findOne(id);
  }

  @Post()
  async createBalance(@Body() createBalanceDto: CreateBalanceDto) {
    return this.balanceService.createOne(createBalanceDto);
  }

  @Patch(':id')
  async updateBalance(
    @Param('id') id: string,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ) {
    return this.balanceService.updateOne(id, updateBalanceDto);
  }
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.balanceService.deleteOne(id);
  }
}
