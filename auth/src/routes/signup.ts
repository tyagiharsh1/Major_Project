import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken'; // Corrected import
import { User } from '../../models/user';

const router = express.Router();

// Validation middleware for signup
const signupValidation = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

// Signup route
router.post(
  '/signup',
  signupValidation,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('Signup route hit');
    console.log('Request body:', req.body);

    const errors = validationResult(req);

    // Check if validation errors exist
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      res.status(400).json({ errors: errors.array() }); // Do not return here
      return; // Just return to exit the function
    }

    const { email, password } = req.body;
    console.log('Email:', email, 'Password:', password);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        res.status(400).json({ message: 'Email already in use' }); // Do not return here
        return; // Just return to exit the function
      }

      // Create a new user and save to the database
      const user = new User({ email, password });
      await user.save();

      // Use the sign function directly
      const userJwt = sign(
        {
          id: user.id,
          email: user.email,
        },
        'asdf' // Replace with a secure secret in production
      );

      req.session = {
        jwt: userJwt,
      };

      console.log('User created successfully');
      res.status(201).json({ message: 'User signed up successfully', user }); // Do not return here
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ message: 'Internal Server Error' }); // Do not return here
    }
  }
);

export { router as signupRouter };
