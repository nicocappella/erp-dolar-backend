import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schema/client.schema';
export declare class ClientService {
    private clientModel;
    constructor(clientModel: Model<ClientDocument>);
    findAll(paginationQuery: PaginationQueryDto): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    createOne(createClientDto: CreateClientDto): Promise<Client>;
    updateOne(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteOne(id: string): Promise<Client>;
}
