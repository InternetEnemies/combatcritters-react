FROM node:alpine

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API
ENV REACT_APP_API $REACT_APP_API

RUN npm run build --production

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build -l 3000