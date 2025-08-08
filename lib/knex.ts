import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import config from '#config/index';

export default knex({
  client: 'mysql2',
  connection: {
    host: config.get("MYSQL_HOST"),
    port: config.get("MYSQL_PORT"),
    user: config.get("MYSQL_USER"),
    password: config.get("MYSQL_PASSWORD"),
    database: config.get("MYSQL_DATABASE"),
  },
  ...knexSnakeCaseMappers(),
});