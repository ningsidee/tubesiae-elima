FROM node:22-alpine

WORKDIR /appno

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]