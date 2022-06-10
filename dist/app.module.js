"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const client_module_1 = require("./client/client.module");
const user_module_1 = require("./user/user.module");
const operator_module_1 = require("./operator/operator.module");
const auth_module_1 = require("./auth/auth.module");
const Joi = require("@hapi/joi");
const database_module_1 = require("./database/database.module");
const operation_module_1 = require("./operation/operation.module");
const currency_module_1 = require("./currency/currency.module");
const balance_module_1 = require("./balance/balance.module");
const movement_module_1 = require("./movement/movement.module");
const passport_1 = require("@nestjs/passport");
const app_constants_1 = require("./app.constants");
const cookie_authentication_guard_1 = require("./auth/guards/cookie-authentication.guard");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            operator_module_1.OperatorModule,
            client_module_1.ClientModule,
            config_1.ConfigModule.forRoot({
                envFilePath: './src/common/envs/.production.env',
                isGlobal: true,
                validationSchema: Joi.object({
                    MONGO_USERNAME: Joi.string().required(),
                    MONGO_PORT: Joi.number().required(),
                    MONGO_DATABASE: Joi.string().required(),
                    NODE_ENV: Joi.string()
                        .required()
                        .valid(app_constants_1.NODE_ENV.DEVELOPMENT, app_constants_1.NODE_ENV.PRODUCTION),
                    SESSION_SECRET: Joi.string().required(),
                }),
            }),
            passport_1.PassportModule.register({
                session: true,
            }),
            auth_module_1.AuthModule,
            operation_module_1.OperationModule,
            currency_module_1.CurrencyModule,
            balance_module_1.BalanceModule,
            movement_module_1.MovementModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_GUARD, useClass: cookie_authentication_guard_1.CookieAuthenticationGuard },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map