# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Production stage - serve static files
FROM node:18-alpine
WORKDIR /app

# Install simple HTTP server
RUN npm install -g http-server

# Copy built static files from builder
COPY --from=builder /app/out ./out

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start HTTP server
CMD ["http-server", "out", "-p", "3000", "--cors"]
