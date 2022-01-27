import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const conf: TypeOrmModuleOptions = {
  keepConnectionAlive: true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};
export default conf;
