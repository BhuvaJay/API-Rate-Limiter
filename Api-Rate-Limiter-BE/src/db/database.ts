import { config } from "../../config/configFile";

const  Sequelize  = require('sequelize');

const dbName = config.getDbName();

const dbUser = config.getDbUser();

const dbPwd = config.getDbPwd();

const dbHost = config.getDbHost();

const dbPort = parseInt(config.getDbPort()!);

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPwd, {
  password: dbPwd,
  host: dbHost,
  port: dbPort,
  logging: false,
  dialect: 'postgres',
});
