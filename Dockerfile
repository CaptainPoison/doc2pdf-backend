# Use the official Debian image
FROM debian:bullseye-slim

# Install dependencies, including LibreOffice and curl
RUN apt-get update && \
    apt-get install -y \
    libreoffice \
    curl \
    nodejs \
    npm \
    && apt-get clean \
    && libreoffice --version  # Check if libreoffice is installed

# Add LibreOffice to PATH (if needed)
ENV PATH="/usr/lib/libreoffice/program:$PATH"

# Set up the working directory
WORKDIR /app

# Copy backend code into the container
COPY backend/ .

# Install backend dependencies
RUN npm install

# Expose port 3001 for the backend API
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
