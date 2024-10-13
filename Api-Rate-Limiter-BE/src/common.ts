import { Response } from "express";
// import { UserCreationAttributes } from "./models/users";

enum ResponseType {
  success = 'success',
  error = 'error',
};

export enum UserType {
  'admin' = 'admin',
  'user' = 'user'
}

export enum EmailSubjects {
  EMAIL_TYPE = 'Subject line',
}

export class CustomError extends Error {
  constructor(message: string = "Something went wrong!", public status: number = 500, public data: object = {}) {
    super(message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized!", data: object = {}) {
    super(message, 401, data);
  }
}
export class UnauthenticatedError extends CustomError {
  constructor(message: string = "Unauthenticated!", data: object = {}) {
    super(message, 403, data);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Not found!", data: object = {}) {
    super(message, 200, data);
  }
}

export class ValidationFailureError extends CustomError {
  constructor(message: string = "Validation failed!", data: object = {}) {
    super(message, 422, data);
  }
}
export class AlreadyExistsError extends CustomError {
  constructor(message: string = "Already exists!", data: object = {}) {
    super(message, 409, data);
  }
}

function sendResponse(
  res: Response,
  statusCode = 500,
  status = ResponseType.error,
  message = 'Something went wrong!',
  data = {}
) {
  return res
    .status(statusCode)
    .json({ status: status === ResponseType.success ? 'success' : 'error', message, data });
}

// Interface for error and success from joi validation
interface joiErrorDetails {
  details: any[]
}
interface joiSuccessData {
  data: object
}

// interface IRequest extends Request {
//   user: UserCreationAttributes,
//   token: string
// }


export { sendResponse, ResponseType, joiSuccessData, joiErrorDetails, };