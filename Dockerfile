FROM debian:bullseye-slim

# Install dependencies including LibreOffice
RUN apt-get update && \
    apt-get install -y \
    libreoffice \
    curl \
    nodejs \
    npm \
    && apt-get clean \
    && libreoffice --version  # Verify LibreOffice is installed

# Check where LibreOffice is installed
RUN which libreoffice

# Add LibreOffice to PATH (if necessary)
ENV PATH="/usr/lib/libreoffice/program:$PATH"

# Set up Node.js environment
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs npm

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

# Start the application
CMD ["node", "index.js"]

