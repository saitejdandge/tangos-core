import 'dotenv/config';
import {validateEnv} from "../src/utils/validateEnv";
import {DbConfig} from "../src/database/db.config";
import {Config} from "../src/Config";
import {AuthConfig} from "../src/auth/AuthConfig";
import {BookController} from "./BookController";
import {BaseApp} from "../src/BaseApp";

//validating environment variables of database
validateEnv();
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;
let dbConfig = new DbConfig(MONGO_USER, MONGO_PASSWORD, MONGO_PATH, {});
let config = new Config(false, []);
let authConfig = new AuthConfig("somerandom");
const app = new BaseApp(
    config,
    authConfig,
    dbConfig,
    [
        new BookController("/books")
    ]
);
app.listen();
