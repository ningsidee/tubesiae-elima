FROM node:22-alpine

WORKDIR /appno

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]