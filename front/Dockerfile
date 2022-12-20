FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tailwind.config.js tailwind.config.js
RUN npm i

COPY public public
COPY tsconfig.json tsconfig.json

COPY src src

CMD npm start