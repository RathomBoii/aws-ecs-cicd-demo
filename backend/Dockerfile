FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

ARG ALLOWED_ORIGIN
ENV ALLOWED_ORIGIN=${ALLOWED_ORIGIN}

RUN npm run build

# -------------------------

FROM  node:23.4.0-slim AS production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production 

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]