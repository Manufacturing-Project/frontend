# Build Stage
FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code and build the app
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the build output from the previous stage to serve with Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY .env .env

# Expose port 80 for the container  
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
