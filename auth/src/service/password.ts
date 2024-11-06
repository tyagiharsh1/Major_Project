import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  // Method to hash the password
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex'); // Generate salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer; // Hash the password with salt

    // Return the hashed password and salt in the format hash.salt
    return `${buf.toString('hex')}.${salt}`; // Fixing the string interpolation
  }

  // Method to compare the stored hashed password with the supplied password
  static async compare(storedPassword: string, suppliedPassword: string) {
    // Split the storedPassword into its hash and salt parts
    const [hashedPassword, salt] = storedPassword.split('.');

    // Hash the supplied password using the same salt
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    // Compare the supplied hashed password with the stored hashed password
    return buf.toString('hex') === hashedPassword;
  }
}
