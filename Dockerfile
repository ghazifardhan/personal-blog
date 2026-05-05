# Use node 22 as base image
FROM node:22-slim AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Build stage
FROM base AS build
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage
FROM base AS runner
WORKDIR /app

COPY --from=build /app/.output ./.output

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
