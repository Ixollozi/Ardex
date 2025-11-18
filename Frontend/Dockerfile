# Используем официальную Node LTS
FROM node:18 AS builder

WORKDIR /app

# Build arguments для переменных окружения
ARG NEXT_PUBLIC_API_URL=
ARG NEXT_PUBLIC_ADMIN_URL=https://ardex.uz

# Устанавливаем переменные окружения для сборки (БЕЗ NODE_ENV=production пока)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ADMIN_URL=$NEXT_PUBLIC_ADMIN_URL

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm install --legacy-peer-deps

# Копируем исходники
COPY . .

# Устанавливаем NODE_ENV=production только для сборки
ENV NODE_ENV=production

# Строим Next.js
RUN npm run build

# Stage для production
FROM node:18-slim

WORKDIR /app

# Устанавливаем NODE_ENV для production runtime
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ADMIN_URL=$NEXT_PUBLIC_ADMIN_URL

# Копируем только собранные файлы и node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
