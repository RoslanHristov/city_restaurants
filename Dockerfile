FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the app
CMD [ "npm", "run", "start:dev" ]
