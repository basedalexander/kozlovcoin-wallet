FROM node:8.2.1

RUN mkdir /app

VOLUME /storage

COPY src /app/src/

COPY package.json /app/
COPY tsconfig.json /app/
COPY tslint.json /app/

COPY .angular-cli.json /app/


RUN cd /app && npm install

EXPOSE 8080

WORKDIR /app
CMD npm start
