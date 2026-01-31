FROM node:22-alpine

WORKDIR /app

# Copiar package.json y package-lock.json primero (para cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código
COPY ./src ./src

# Si tu backend usa otros archivos (ej: .env no se copia por seguridad)
# COPY ./config ./config

EXPOSE 3000

# Opción A: si tienes script "start"
CMD ["npm", "start"]
