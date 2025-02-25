FROM node:23-alpine
WORKDIR /app
COPY *.js *.json ./
RUN npm install

CMD [ "npm", "start" ]