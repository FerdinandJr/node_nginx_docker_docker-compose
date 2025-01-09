# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
RUN npm install express

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3002

# Run the app
CMD ["node", "index.js"]