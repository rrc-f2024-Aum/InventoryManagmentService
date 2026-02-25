import { Request, Response, NextFunction, RequestHandler } from "express";
import * as productService from "../services/productService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Product created',
      data: product,
    });
  } catch (error) {
    if ((error as Error).message.includes('SKU already exists')) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: (error as Error).message,
      });
      return;
    }
    next(error);
  }
};

export const getProductById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: 'Product not found',
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: 'Product retrieved',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await productService.deleteProduct(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      message: 'Product deleted',
    });
  } catch (error) {
    if ((error as Error).message === 'PRODUCT_NOT_FOUND') {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: 'Product not found',
      });
      return;
    }
    next(error);
  }
};