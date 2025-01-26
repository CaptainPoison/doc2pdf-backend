FROM debian:bullseye-slim

# Install dependencies, including curl, LibreOffice, and other required utilities
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    sudo \
    wget && \
    echo "deb http://download.opensuse.org/repositories/LibreOffice:/stable/Debian_10/ /" | tee /etc/apt/sources.list.d/libreoffice.list && \
    curl -fsSL https://download.opensuse.org/repositories/LibreOffice:/stable/Debian_10/Release.key | apt-key add - && \
    apt-get update && \
    apt-get install -y libreoffice

# Set up Node.js environment
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs npm

# Set up the working directory
WORKDIR /app

# Copy backend code into the container
COPY backend/ .

# Install backend dependencies
RUN npm install

# Expose the backend port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]

