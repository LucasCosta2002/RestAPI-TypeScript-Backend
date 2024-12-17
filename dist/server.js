"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//conectar a db
async function connectDB() {
    try {
        //autenticarse a la db
        await db_1.default.authenticate();
        //sincronizar la db
        db_1.default.sync();
        // console.log(colors.blue("Conectado a la db"));
    }
    catch (error) {
        // console.log(error);
        console.log(colors_1.default.red.bold("Hubo un error al conectarse a la db"));
    }
}
connectDB();
//creamos el servidor
exports.server = (0, express_1.default)();
//habilitar cors
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error("Error de Cors"));
        }
    }
};
//permite conexiones siempre, se va a ejecutar con cualquier verbo (GET; POST; PUT; DELETE)
exports.server.use((0, cors_1.default)(corsOptions));
//leer datos de formularios
exports.server.use(express_1.default.json());
// brinda informacion sobre consultas http
exports.server.use((0, morgan_1.default)('dev'));
exports.server.use("/api/products", router_1.router);
// server.get("/api", (req, res) => {
//     res.json({msg: "Desde API"})
// })
//Docs
exports.server.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
//# sourceMappingURL=server.js.map