// db/dbInit.ts
import { Client } from 'pg';
import { config } from '../../config/configFile';

const dbName = config.getDbName();
const dbUser = config.getDbUser();
const dbPwd = config.getDbPwd();
const dbHost = config.getDbHost();
const dbPort = parseInt(config.getDbPort()!);

export const createDatabase = async () => {
  const client = new Client({
    user: dbUser,
    password: dbPwd,
    host: dbHost,
    port: dbPort,
  });

  try {
    await client.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully!`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
  } finally {
    await client.end();
  }
};
