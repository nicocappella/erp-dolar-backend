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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: [' GET', 'POST', 'PATCH', 'DELETE'],
    });
    const configService = app.get(config_1.ConfigService);
    const mongoUsername = configService.get('MONGO_USERNAME');
    const mongoPassword = configService.get('MONGO_PASSWORD');
    const mongoPort = configService.get('MONGO_PORT');
    const mongoDbName = configService.get('MONGO_DATABASE');
    const mongoConnection = configService.get('MONGO_URI');
    const sessionSecret = configService.get('SESSION_SECRET');
    const enviroment = configService.get('NODE_ENV');
    const uri = enviroment === 'development'
        ? `${mongoConnection}://${mongoUsername}:${mongoPort}`
        : `${mongoConnection}://${mongoUsername}:${mongoPassword}@${mongoDbName}.48zjsbj.mongodb.net/?retryWrites=true&w=majority`;
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.use((0, helmet_1.default)());
    app.use(session({
        name: 'nest-js-api',
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
            httpOnly: true,
            secure: false,
        },
        store: MongoStore.create({
            mongoUrl: uri,
            dbName: mongoDbName,
            collectionName: 'sessions',
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map