# Use the official Node.js image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install express

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3003

# Run the app
CMD ["node", "index.js"]