import { ValidationError } from 'express-validator';

export class RequestValidatorError extends Error {
    constructor(public errors: ValidationError[]) {
        super(JSON.stringify(errors)); // Convert the array of errors to a string message
        Object.setPrototypeOf(this, RequestValidatorError.prototype);
    }
}