# Use an official Node runtime as a parent image
FROM node:lts-alpine3.20

# Set the working directory in the container
WORKDIR /code

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the local code to the container
COPY . .

# Expose port 5173 to the outside world (assuming Vite default port)
EXPOSE 5173

# Run Vite development server
CMD ["npm", "run", "dev"]
