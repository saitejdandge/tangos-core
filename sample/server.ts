import 'dotenv/config';
import { AuthConfig } from '../src/auth/AuthConfig';
import { BaseApp } from '../src/BaseApp';
import { Config } from '../src/Config';
import { DbConfig } from '../src/database/db.config';
import { validateEnv } from '../src/utils/validateEnv';
import { BookController } from './BookController';

// validating environment variables of database
validateEnv();
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;
const dbConfig = new DbConfig(MONGO_USER, MONGO_PASSWORD, MONGO_PATH, {});
const config = new Config(false, []);
const authConfig = new AuthConfig('somerandom');
const app = new BaseApp(
    config,
    authConfig,
    dbConfig,
    [new BookController('/books')],
);
app.listen();
