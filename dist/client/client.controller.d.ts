import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schema/client.schema';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    findClients(paginationQuery: PaginationQueryDto): Promise<Client[]>;
    findClient(id: string): Promise<Client>;
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    updateClient(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
    deleteClient(id: string): Promise<Client>;
}
