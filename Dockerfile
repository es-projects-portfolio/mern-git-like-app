# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]
