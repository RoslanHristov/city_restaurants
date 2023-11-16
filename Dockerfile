FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build