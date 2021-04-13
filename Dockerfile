FROM node:12.18.2-alpine
WORKDIR /dist
COPY package.json ./
RUN yarn install --production
COPY src ./src
CMD node src/index.js