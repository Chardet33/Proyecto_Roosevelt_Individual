# 1. Usar Node 22 para cumplir con los requisitos de tu Angular CLI
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Servidor Nginx para la producción
FROM nginx:alpine

# 1. Limpiamos y aseguramos que la carpeta exista
RUN rm -rf /usr/share/nginx/html/*

# 2. Copiamos el contenido del build directamente a la raíz de Nginx
COPY --from=build /app/dist/roosevelt_admin/browser/ /usr/share/nginx/html/

# 3. Ajuste para Angular SSR/CSR: Nginx espera index.html
RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then cp /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi

# 4. Permisos para que Nginx pueda leer los archivos
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80