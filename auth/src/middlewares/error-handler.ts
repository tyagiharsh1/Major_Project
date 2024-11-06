import { Request, Response, NextFunction } from 'express';
import { RequestValidatorError } from '../error/request-validation-error'; // Corrected import
import { DatabaseConnectionError } from '../error/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error to the console (optional)
  if (err instanceof RequestValidatorError) { // Use correct class name
    console.log('Handling this error as a request validation error');
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('Handling this error as a database connection error');
  }
  console.error(err.message);

  // Send error message in response
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,  // Send the specific error message to the client
  });
};