# Stage 1: Build the backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root configurations and lockfiles
COPY package.json package-lock.json nx.json ./
# Copy workspace apps and packages setup
COPY apps/backend/package.json ./apps/backend/

# Install dependencies for the workspace
RUN npm ci

# Copy the entire backend source code
COPY apps/backend ./apps/backend

# Build the NestJS app
RUN npm run build --workspace=apps/backend

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files for production install
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

# Install only production dependencies to save space
RUN npm ci --omit=dev

# Copy compiled backend from builder stage
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Expose NestJS default port
EXPOSE 3000

# Start the server
CMD ["node", "apps/backend/dist/main"]
