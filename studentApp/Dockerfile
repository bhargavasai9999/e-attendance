FROM node:20-buster-slim

EXPOSE 19000 
EXPOSE 19001
RUN apt install openjdk-11-jre-headless
RUN 
RUN apt-get update && \
    apt-get install -y --no-install-recommends android-tools-adb

WORKDIR /e-attendance

COPY package.json ./

RUN npm install

COPY . .

CMD adb connect host.docker.internal && npm run android
