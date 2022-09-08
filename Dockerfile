FROM node:16.17

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]