# Use the official Node.js image from the Alpine variant
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (optional but recommended)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
