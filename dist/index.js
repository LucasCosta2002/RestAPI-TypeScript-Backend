"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const colors_1 = __importDefault(require("colors"));
const PORT = process.env.PORT || 4000;
server_1.server.listen(PORT, () => {
    console.log(colors_1.default.cyan.bold(`rest api en puesto ${PORT}"`));
});
//# sourceMappingURL=index.js.map