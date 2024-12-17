import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Product from "../models/Product.module";

export const getProducts = async (req : Request, res:  Response) =>{
    try {
        const products = await Product.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });

        res.json({data: products})

    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req : Request, res:  Response) =>{
    try {
        const {id} = req.params;

        const product = await Product.findByPk(id);
        
        if ( !product ) {
            return res.status(404).json({msg: 'Product not found'})
        }

        res.json({data: product})
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req : Request, res:  Response) =>{
    try {
        // const product = new Product(req.body)

        // esperar hasta que se guarde con el id para despues retornar
        // const savedProduct = await product.save()

        //lo mismo de antes
        const product = await Product.create(req.body)

        res.status(201).json({data: product})

    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req : Request, res:  Response) =>{
    try {
        const {id} = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({msg: 'Product not found'})
        }

        //actualizar
        await product.update(req.body)
        await product.save();

        res.json({data: product})
    } catch (error) {
        console.log(error);
    }
}

export const updateAvailability = async (req : Request, res:  Response) =>{
    try {
        const {id} = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({msg: 'Product not found'})
        }

        //actualizar lo contrario que hay en la base de datos
        product.availability = !product.dataValues.availability
        await product.save();

        res.json({data: product})
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req : Request, res:  Response) =>{
    try {
        const {id} = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({msg: 'Product not found'})
        }

        //eliminado fisico
        await product.destroy();

        //eliminado logico
        //product.deletedAt = !product.dataValues.deletedAt

        res.json({data: "Product deleted"})
    } catch (error) {
        console.log(error);
    }
}