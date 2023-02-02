FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=camera_server_web --docker

FROM node:alpine AS installer

RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=security_camera_web

FROM node:alpine AS runner
LABEL org.opencontainers.image.source=https://github.com/Smartfactory-Tec/smartfactory_web
ENV CAMERA_SERVER_WEB_CONFIG_PATH=/config
WORKDIR /app

RUN npm i -g next
RUN npm i toml

COPY --from=installer /app/apps/camera_server_web/ ./


ENTRYPOINT ["npm", "start"]
