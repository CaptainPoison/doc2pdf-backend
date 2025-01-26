# Base image with Node.js and LibreOffice installed
FROM debian:bullseye-slim

# Install dependencies, including LibreOffice
RUN apt-get update && \
    apt-get install -y libreoffice && \
    apt-get clean

# Set up Node.js environment
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy backend code into the container
COPY backend/ .

# Install backend dependencies
RUN npm install

# Expose the backend port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]


# Start the application
CMD ["node", "index.js"]

