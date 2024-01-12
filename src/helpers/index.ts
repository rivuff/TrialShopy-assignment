import crypto from 'crypto'
import dotenv from 'dotenv';

dotenv.config();
// Shared secret key for password hashing
const SECRET = process.env.SECRETKEY || '';

// Function to generate a random string
export const random = () => crypto.randomBytes(128).toString('base64');

// Function for user authentication using password and salt
export const authentication = (salt: string, password: string) => {
    // Creating an HMAC (Hash-based Message Authentication Code) using SHA256 algorithm
    // The salt and password are concatenated with '/' and then hashed with the secret key
    // The resulting hash is then converted to hexadecimal format
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}
