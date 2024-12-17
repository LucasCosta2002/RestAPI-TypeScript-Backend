"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "Api operations related to products"
            }
        ],
        info: {
            title: "REST API Node.js / Express / Typescript",
            version: "1.0.0",
            description: "API docs for Products"
        }
    },
    apis: ["./src/router.ts"]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUIOptions = {
    customSiteTitle: "Documentacion REST API Express / TypeScript"
};
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map