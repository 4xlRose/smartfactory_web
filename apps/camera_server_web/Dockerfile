FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=camera_server_web --docker

FROM node:alpine AS runner

RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=camera_server_web

ENV CAMERA_SERVER_WEB_CONFIG_PATH=/config

ENTRYPOINT ["npm", "start", "--prefix", "./apps/camera_server_web"]
