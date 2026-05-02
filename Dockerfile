# Multi-stage build for production-ready Docker image

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Accept public env vars as build args (baked into JS bundle by Next.js)
ARG NEXT_PUBLIC_STRAVA_CLIENT_ID
ARG NEXT_PUBLIC_WHOOP_CLIENT_ID

# Build Next.js app
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache tini

# Create data directory
RUN mkdir -p /app/data

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/training-plan.json ./training-plan.json

# Copy tsconfig for tsx scripts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create non-root user and give it ownership of the data directory
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 \
    && chown -R nextjs:nodejs /app/data

USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use tini to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Expose port
EXPOSE 3000

# Initialize DB tables then start Next.js
CMD ["sh", "-c", "npx tsx scripts/init-db.ts && npx tsx scripts/import-plan.ts && npm start"]
