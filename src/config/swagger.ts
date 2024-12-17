import swaggerJSdoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express';

const options : swaggerJSdoc.Options = {
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
}

const swaggerSpec = swaggerJSdoc(options);

const swaggerUIOptions : SwaggerUiOptions = {
    customSiteTitle: "Documentacion REST API Express / TypeScript"
} 

export default swaggerSpec;