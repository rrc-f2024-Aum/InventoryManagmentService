import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`,
      });
      return;
    }

    next();
  };
};

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`,
      });
      return;
    }

    next();
  };
};