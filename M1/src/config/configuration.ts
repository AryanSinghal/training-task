import { IConfig } from './IConfig';
import { config } from 'dotenv';

config();

const configuration: IConfig = {
    port : process.env.PORT,
    nodeEnv : process.env.NODE_ENV,
    mongoUrl: process.env.MONGO_URL,
};

Object.freeze(configuration);

export default configuration;
