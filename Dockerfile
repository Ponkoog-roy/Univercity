FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@11.5.1

COPY . .

RUN pnpm install

RUN pnpm build:prod

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]