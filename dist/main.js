"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const MongoStore = require('connect-mongo');
const app_constants_1 = require("./app.constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'https://erp-dolar-frontend.vercel.app',
            'https://main.d3t0dsf10bwzod.amplifyapp.com',
        ],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200,
    });
    app.set('trust proxy', 1);
    const configService = app.get(config_1.ConfigService);
    const mongoUsername = configService.get('MONGO_USERNAME');
    const mongoPassword = configService.get('MONGO_PASSWORD');
    const mongoPort = configService.get('MONGO_PORT');
    const mongoDbName = configService.get('MONGO_DATABASE');
    const mongoConnection = configService.get('MONGO_URI');
    const sessionSecret = configService.get('SESSION_SECRET');
    const enviroment = configService.get('NODE_ENV');
    const uri = enviroment === app_constants_1.NODE_ENV.DEVELOPMENT
        ? `${mongoConnection}://${mongoUsername}:${mongoPort}`
        : `${mongoConnection}://${mongoUsername}:${mongoPassword}@${mongoDbName}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.use((0, helmet_1.default)());
    app.use(session({
        name: 'dolar-erp',
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
            httpOnly: true,
            secure: enviroment === app_constants_1.NODE_ENV.DEVELOPMENT ? false : true,
            sameSite: 'none',
        },
        store: MongoStore.create({
            mongoUrl: uri,
            dbName: mongoDbName,
            collectionName: 'sessions',
            ttl: 24 * 60 * 60,
            autoRemove: 'native',
            stringify: true,
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map