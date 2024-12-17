import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

dotenv.config()

// ! le dice que si o si va a existir la variable de entorno
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + "/../models/**/*"],
    logging: false,
    dialect: 'postgres',
    dialectModule: require('pg')
})

export default db