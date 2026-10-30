# syntax=docker/dockerfile:1

# Next.js (output: "standalone") — k8s uchun production image.
# Lokal sinov: docker build -t landing . && docker run --rm -p 3000:3000 landing

ARG NODE_VERSION=24
ARG BUN_VERSION=1.3

FROM oven/bun:${BUN_VERSION}-slim AS bun

# 1) Bog'liqliklar — faqat package.json / bun.lock o'zgarganda qayta o'rnatiladi
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 2) Build
FROM node:${NODE_VERSION}-bookworm-slim AS builder
WORKDIR /app
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# 3) Runtime — node_modules'siz, faqat standalone natija
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# standalone server.js public/ va .next/static'ni o'zi ko'chirmaydi — qo'lda qo'shiladi
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# root emas: rasmda tayyor "node" foydalanuvchisi (uid 1000)
USER node

EXPOSE 3000

# exec-forma: node PID 1 bo'ladi va k8s SIGTERM'ini to'g'ridan-to'g'ri oladi
CMD ["node", "server.js"]
