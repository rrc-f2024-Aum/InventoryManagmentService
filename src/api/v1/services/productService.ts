import { Product } from "../models/productModel";
import * as firestoreRepository from "../repositories/firestoreRepository"; 

const COLLECTION = 'products';

export const createProduct = async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product & { id: string }> => {
    try {
        const products = await firestoreRepository.getAllDocuments<Product>(COLLECTION); 
        const skuExists = products.some(p => p.sku === productData.sku);
        
        if (skuExists) {
            throw new Error('Product with this SKU already exists');
        }

        return await firestoreRepository.createDocument<Product>(COLLECTION, productData as Product);
    } catch (error) {
        throw error;
    }
};

export const getAllProducts = async (): Promise<(Product & { id: string })[]> => {
    try {
        return await firestoreRepository.getAllDocuments<Product>(COLLECTION);
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (id: string): Promise<(Product & { id: string }) | null> => {
    try {
        return await firestoreRepository.getDocumentById<Product>(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const existingProduct = await getProductById(id);
        if (!existingProduct) {
            throw new Error('PRODUCT_NOT_FOUND');
        }

        await firestoreRepository.deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};