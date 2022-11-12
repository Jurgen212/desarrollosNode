
import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'root', 'jurgenadolfo', {
    host: 'localhost',
    dialect: 'mysql' ,
    //login: false,
});

export default db;