"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_module_1 = __importDefault(require("../models/Product.module"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_module_1.default.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json({ data: products });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_module_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        // const product = new Product(req.body)
        // esperar hasta que se guarde con el id para despues retornar
        // const savedProduct = await product.save()
        //lo mismo de antes
        const product = await Product_module_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_module_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        //actualizar
        await product.update(req.body);
        await product.save();
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_module_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        //actualizar lo contrario que hay en la base de datos
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_module_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        //eliminado fisico
        await product.destroy();
        //eliminado logico
        //product.deletedAt = !product.dataValues.deletedAt
        res.json({ data: "Product deleted" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map