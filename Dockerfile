# 1. Base image olarak resmi Node.js image'ı kullan
FROM node:18-alpine

# 2. Çalışma dizinini oluştur
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 4. Uygulama dosyalarını kopyala
COPY . .

# 5. Next.js uygulamasını build et
RUN npm run build

# 6. Container çalıştırıldığında çalışacak komut
CMD ["npm", "run", "start"]
