# Используем официальную Node LTS
FROM node:18 AS builder

WORKDIR /app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (кэшируется)
RUN npm ci

# Копируем исходники
COPY . .

# Строим Next.js
RUN npm run build

# Stage для production
FROM node:18-slim

WORKDIR /app

# Копируем только собранные файлы и node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
