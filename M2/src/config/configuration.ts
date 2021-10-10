import { IConfig } from './IConfig';
import { config } from 'dotenv';

config();

const configuration: IConfig = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};

Object.freeze(configuration);

export default configuration;
