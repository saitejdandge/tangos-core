import 'dotenv/config';
import { AuthConfig } from '../src/auth/AuthConfig';
import { BaseApp } from '../src/BaseApp';
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
const app = new BaseApp(
    dbConfig,
);
app.addMiddleware(new BookController('/books'));
app.listen();
