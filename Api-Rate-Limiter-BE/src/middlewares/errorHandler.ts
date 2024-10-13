import { NextFunction, Request, Response } from "express";
import { CustomError, ResponseType, sendResponse } from "../common";

export const errorHandler = (error: CustomError, request: Request, response: Response, next: NextFunction) => {
    sendResponse(response, error.status, ResponseType.error, error.message, error.data);
};

