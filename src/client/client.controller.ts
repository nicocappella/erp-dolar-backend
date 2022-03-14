import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schema/client.schema';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async findClients(
    @Query() paginationQuery: PaginationQueryDto,
    @Session() session: Record<string, any>,
  ): Promise<Client[]> {
    return this.clientService.findAll(paginationQuery);
  }

  @Get(':id')
  async findClient(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }
  @Post()
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createOne(createClientDto);
  }
  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateOne(id, updateClientDto);
  }
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteOne(id);
  }
}
