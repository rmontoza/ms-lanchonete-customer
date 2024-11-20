# Dockerfile

# Use a imagem oficial do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos do diretório local para o diretório de trabalho do contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte da aplicação para o diretório de trabalho do contêiner
COPY . .

# Compile o TypeScript
RUN npm run build

# Expõe a porta 3000 para o ambiente externo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
