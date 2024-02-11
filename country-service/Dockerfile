FROM node:18-alpine

# Create app directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files from the current directory to the container
COPY . .

# Expose the port 5000 
EXPOSE 5000

# Run the app
CMD ["npm", "start"]