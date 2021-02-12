FROM node:14.15.5-alpine3.12 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.5-alpine3.12 AS production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

ENV NODE_ENV=production

EXPOSE 3009

CMD [ "npm", "start" ]
