import express, { json } from 'express';
import { router } from './router';
import db from './config/db';
import colors  from 'colors';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from './config/swagger';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';

//conectar a db
export async function connectDB() {
    try {
        //autenticarse a la db
        await db.authenticate();

        //sincronizar la db
        db.sync();

        // console.log(colors.blue("Conectado a la db"));
    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold("Hubo un error al conectarse a la db"));
    }
}

connectDB();

//creamos el servidor
export const server = express();

//habilitar cors
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if ( origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }else {
            callback(new Error("Error de Cors"));
        }
    }
}

//permite conexiones siempre, se va a ejecutar con cualquier verbo (GET; POST; PUT; DELETE)
server.use(cors(corsOptions));

//leer datos de formularios
server.use(express.json());

// brinda informacion sobre consultas http
server.use(morgan('dev'));

server.use("/api/products", router);

// server.get("/api", (req, res) => {
//     res.json({msg: "Desde API"})
// })

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));