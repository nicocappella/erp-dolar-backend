import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schema/client.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Client[]> {
    const { limit, offset } = paginationQuery;
    return this.clientModel
      .find()
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ _id: id }).exec();
    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return client;
  }

  async createOne(createClientDto: CreateClientDto): Promise<Client> {
    const createClient = new this.clientModel(createClientDto);
    return createClient.save();
  }

  async updateOne(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const existingClient = await this.clientModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateClientDto,
        },
        { new: true },
      )
      .exec();
    if (!existingClient) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return existingClient;
  }
  async deleteOne(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deletedClient) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return deletedClient;
  }
}
