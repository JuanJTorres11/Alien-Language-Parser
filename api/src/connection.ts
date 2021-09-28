import { createConnection, Connection } from 'typeorm';
import config from './config';
import InvalidMessage from './domain/invalid_message';
import Leader from './domain/leader';
import Message from './domain/message';
import Type from './domain/type';

async function connect(): Promise<Connection> {
  return createConnection({
    type: 'postgres',
    host: config.postgresDB.host,
    port: config.postgresDB.port,
    username: config.postgresDB.username,
    password: config.postgresDB.password,
    database: config.postgresDB.database,
    synchronize: true,
    subscribers: [],
    logger: 'simple-console',
    entities: [
      // `${__dirname}/domain/*.js`,
      // `${__dirname}/domain/*.ts`
      Message,
      Leader,
      Type,
      InvalidMessage,
    ]
  });
}

export default connect;
