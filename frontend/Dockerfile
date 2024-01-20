FROM node:21.5.0-alpine

WORKDIR /e-attendance

COPY package.json ./

RUN npm install

COPY . .
EXPOSE 3000

CMD [ "npm","run","dev" ]
