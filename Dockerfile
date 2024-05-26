# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy app files
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Run the app
CMD ["npm", "start"]
