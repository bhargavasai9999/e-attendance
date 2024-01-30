FROM node:21.5.0-alpine



WORKDIR /e-attendance

COPY package.json ./

RUN npm install -g expo-cli
RUN npm install

COPY . .
EXPOSE 8081

CMD  ["npm","start"]
