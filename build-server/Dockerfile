FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update -y
RUN apt-get install -y nodejs

RUN apt-get install -y git

WORKDIR /home/app

COPY main.sh main.sh
COPY script.js script.js
COPY config.js config.js
COPY package*.json .
COPY .env .

RUN npm install
RUN npm install -g pm2

RUN chmod +x  main.sh
RUN chmod +x script.js

ENTRYPOINT [ "/home/app/main.sh" ]