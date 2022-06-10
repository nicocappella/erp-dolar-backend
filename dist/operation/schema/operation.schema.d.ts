/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
import { Document, Schema as MongoSchema } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Operator } from 'src/operator/schema/operator.schema';
export declare type OperationDocument = Operation & Document;
export declare class Operation {
    client: Client;
    operator: Operator;
    operation: string;
    listedCurrency: Currency;
    refCurrency: Currency;
    rate: number;
    buy: number;
    sell: number;
    state: string;
}
export declare const OperationSchema: MongoSchema<Operation, import("mongoose").Model<Operation, any, any, any>, {}, {}, any>;
