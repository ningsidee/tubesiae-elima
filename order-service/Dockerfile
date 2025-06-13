FROM node:22-alpine

WORKDIR /appno

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]