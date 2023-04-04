import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
    // type: 'postgres',
    // host: process.env.DATABASE_HOST,
    // port: +process.env.DATABASE_PORT,
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    // entities: ['dist/**/*.entity.js'],
    // migrations: ['dist/db/migrations/*.js'],

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qasim35',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    
   
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource