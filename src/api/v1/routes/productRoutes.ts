import express from "express";
import { validateBody, validateParams } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";
import * as productController from "../controllers/productController";

const router = express.Router();

// Health endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0',
    });
});

// POST - Create product
router.post(
    '/products',
    validateBody(productSchemas.create.body),  
    productController.createProduct
);

// GET by ID
router.get(
    '/products/:id',
    validateParams(productSchemas.getById.params),
    productController.getProductById
);

// DELETE
router.delete(
    '/products/:id',
    validateParams(productSchemas.delete.params), 
    productController.deleteProduct
);

export default router;