require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

const cats = require('./api/cats');
const CatsService = require('./services/postgres/CatsService');

const dogs = require('./api/dogs');
const DogsService = require('./services/postgres/DogsService');

const products = require('./api/marketplace/products');
const ProductsService = require('./services/postgres/marketplace/ProductsService');

const charts = require('./api/marketplace/charts');
const ChartsService = require('./services/postgres/marketplace/ChartsService');

const articles = require('./api/features/articles');
const ArticlesService = require('./services/postgres/features/ArticlesService');

const pets = require('./api/pets');
const PetsService = require('./services/postgres/PetsService');
const PetsValidator = require('./validator/pets');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {

    const catsService = new CatsService();
    const dogsService = new DogsService();
    const productsService = new ProductsService();
    const chartsService = new ChartsService();
    const articlesService = new ArticlesService();
    const petsService = new PetsService();
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: Jwt,
        },
    ]);

    server.auth.strategy('huze_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        Inert,
        {
            plugin: cats,
            options: {
                service: catsService,
            },
        },
        {
            plugin: dogs,
            options: {
                service: dogsService,
            },
        },
        {
            plugin: products,
            options: {
                service: productsService,
            },
        },
        {
            plugin: charts,
            options: {
                service: chartsService,
            },
        },
        {
            plugin: articles,
            options: {
                service: articlesService,
            },
        },
        {
            plugin: pets,
            options: {
                service: petsService,
                validator: PetsValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
