# Base image with Node.js and LibreOffice installed
FROM debian:bullseye-slim

# Install dependencies and LibreOffice
RUN apt-get update && \
    apt-get install -y curl libreoffice && \
    apt-get clean

# Set up Node.js environment
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy the backend code into the container
COPY backend/ .

# Install backend dependencies
RUN npm install

# Expose the backend port (assuming your backend runs on port 3001)
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
