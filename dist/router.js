"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("./handlers/product");
const middleware_1 = require("./middleware");
exports.router = (0, express_1.Router)();
//definir Schema
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product Id
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Monitor Curvo
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */
// routing -- controllers
// Documentacion
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of Products
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
exports.router.get("/", product_1.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a products by Id
 *          tags:
 *              - Products
 *          description: Return a product based on its unique Id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Bad Request - Invalid Id
 *
 */
exports.router.get("/:id", (0, express_validator_1.param)('id').isInt().withMessage('Id not valid'), middleware_1.handleInputsErrors, product_1.getProductById);
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 *
 */
exports.router.post("/", 
// validacion
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('Name is required'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Price must be a number')
    .notEmpty().withMessage('Price is required')
    .custom(value => value > 0).withMessage('Price must be greater than 0'), middleware_1.handleInputsErrors, product_1.createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid id or invalid input data
 *              404:
 *                  description: Product Not Found
 */
exports.router.put("/:id", (0, express_validator_1.param)('id').isInt().withMessage('Id not valid'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('Name is required'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Price must be a number')
    .notEmpty().withMessage('Price is required')
    .custom(value => value > 0).withMessage('Price must be greater than 0'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Availability not valid'), middleware_1.handleInputsErrors, product_1.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update a product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid id
 *              404:
 *                  description: Product Not Found
 */
exports.router.patch("/:id", (0, express_validator_1.param)('id').isInt().withMessage('Id not valid'), middleware_1.handleInputsErrors, product_1.updateAvailability);
/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by a given id
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - invalid id
 *              404:
 *                  description: Product Not Found
 */
exports.router.delete("/:id", (0, express_validator_1.param)('id').isInt().withMessage('Id not valid'), middleware_1.handleInputsErrors, product_1.deleteProduct);
//# sourceMappingURL=router.js.map