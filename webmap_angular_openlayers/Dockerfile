# Stage 1: Build the Angular app
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

# Install Angular CLI globally and the project's dependencies
RUN npm install -g @angular/cli && npm install

COPY . .

# Build the Angular app for production
RUN ng build --configuration=production

# Stage 2: Serve the Angular app using Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Copy the built app files to the Nginx HTML directory. 
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Expose the container port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]