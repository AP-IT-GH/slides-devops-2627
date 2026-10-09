FROM node:alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules && npm install

EXPOSE  3000

CMD [ "/bin/sh", "-c", "sleep 60; node app.js"]