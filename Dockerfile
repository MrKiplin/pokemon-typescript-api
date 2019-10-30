FROM node:8-alpine
WORKDIR /dist
COPY package.json ./
RUN yarn install --production
COPY src ./src
CMD node src/index.js