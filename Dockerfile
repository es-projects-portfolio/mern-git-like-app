# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Install `concurrently`
# RUN npm install -g concurrently

# Copy server dependencies and install them
COPY package*.json ./
RUN npm install

# Change directory to client and install vite
WORKDIR /app/client
RUN npm install vite --save-dev

# Build the client-side application
# RUN npm run build

# Change directory back to the root
WORKDIR /app

# Copy project files
COPY . .

# Expose port
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]
