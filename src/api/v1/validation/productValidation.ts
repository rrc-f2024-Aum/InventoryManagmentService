import Joi from 'joi';

const categories = [
    'electronics',
    'clothing',
    'food',
    'tools',
    'other'
] as const;


export const productSchemas = {
    create: {
        body: Joi.object({

            name: Joi.string().min(2).max(80).required().messages({
                'string.min': 'Name must be at least 2 characters long',
                'string.max': 'Name cannot exceed 80 characters',
                'any.required': 'Name is required'
            }),

            sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required().messages({
                'string.pattern.base': 'SKU must be 3 uppercase letter followed by 4 digits',
                'any.required': 'SKU is required'
            }),

            quantity: Joi.number().integer().min(0).required().messages({
                'number.min': 'Quantity must be a non-negative integer',
                'any.required': 'Quantity is required',
            }),

            price: Joi.number().positive().precision(2).required().messages({
                'number.positive': 'Price must be a positive number',
                'any.required': 'Price is required'
            }),

            category: Joi.string().valid(...categories).required().messages({
                'any.only': 'Category must be one of: electronics, clothing, food, tools, other',
                'any.required': 'Category is required'
            }),
            
        }),
    },

    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'Product ID is required'
            }),
        }),

        body: Joi.object({
            name: Joi.string().min(2).max(80).optional(),
            quantity: Joi.number().integer().min(0).optional(),
            price: Joi.number().positive().precision(2).optional(),
            category: Joi.string().valid(...categories).optional()
        }).min(1).messages({
            'object.min': 'At least one field must be provided for update'
        }),
    },

    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'Product ID is required'
            }),
        }),
    },

    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'Product ID is required'
            }),
        }),
    },

};