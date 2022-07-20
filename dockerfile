FROM node:latest

WORKDIR /home/node

COPY package.json /home/node/package.json
COPY package-lock.json /home/node/package-lock.json

RUN npm install

COPY . /home/node

CMD node /home/node/src/index.mjs
