// database-connection-error.ts
export class DatabaseConnectionError extends Error {
    reason: string;

    constructor() {
        super("Error connecting to the database"); // Provide a default message
        this.reason = 'Error connecting to the database';
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
        // error
    }
}
