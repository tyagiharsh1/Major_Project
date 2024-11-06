import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUser } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';

// Create an Express app instance
const app = express();

// Middleware to parse incoming request bodies as JSON
app.use(express.json());
app.set('trust proxy',true);
app.use(
  cookieSession({
    signed:false,
    secure:false
  })
);


// Define routes
app.use('/api/auth', signupRouter);  // Ensure correct usage
  // For signup
app.use('/api/auth/signin', signinRouter);  // For signin
app.use('/api/auth/signout', signoutRouter); // For signout
app.use('/api/auth/currentuser', currentUser); // For current user info

// Error handling middleware
app.use(errorHandler);

// Start function to connect to MongoDB and launch the server
const start = async () => {
  const mongoUri = 'mongodb+srv://500091612:ef7joTDvnS2wXgy6@cluster0.lfrb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  try {
    // No need to specify useNewUrlParser or useUnifiedTopology in Mongoose 6+
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Start the server only after a successful MongoDB connection
    app.listen(3000, () => {
      console.log('Listening on port 3000! 🖥️🖥️');
    });
  } catch (err) {
    if (err instanceof Error) {
      // TypeScript now knows it's an Error object
      console.error('Failed to connect to MongoDB:', err.message);
    } else {
      // Handle unexpected errors
      console.error('An unknown error occurred:', err);
    }
    process.exit(1); // Exit process with failure if connection fails
  }
};

// Start the app
start();
