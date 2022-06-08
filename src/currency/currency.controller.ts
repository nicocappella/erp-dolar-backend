import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update.currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get()
  async findCurrencies() {
    return this.currencyService.findAll();
  }
  @Post()
  async createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.createOne(createCurrencyDto);
  }
  @Patch(':id')
  async updateCurrency(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currencyService.updateOne(id, updateCurrencyDto);
  }
  @Delete(':id')
  async deleteCurrency(@Param('id') id: string) {
    return this.currencyService.deleteOne(id);
  }
}
