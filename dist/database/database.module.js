"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const username = configService.get('MONGO_USERNAME');
                    const password = configService.get('MONGO_PASSWORD');
                    const port = configService.get('MONGO_PORT');
                    const database = configService.get('MONGO_DATABASE');
                    const host = configService.get('MONGO_HOST');
                    const enviroment = configService.get('NODE_ENV');
                    const connection = configService.get('MONGO_URI');
                    const uri = enviroment === 'development'
                        ? `${connection}://${username}:${port}`
                        : `${connection}://${username}:${password}@${database}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
                    return {
                        uri,
                        dbName: database,
                    };
                },
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map