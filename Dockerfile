# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /code

# Install dependencies
COPY package.json .
RUN npm install

# Copy the local code to the container
COPY . .

# Expose port 3000 to the outside world (assuming Vite default port)
EXPOSE 5173

# Run Vite development server
CMD ["npm", "run","dev"]
