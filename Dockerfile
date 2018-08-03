FROM node:carbon
# Docker image for JavaScript SDK Test server

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run gulp
RUN npm test
RUN npm run build-test-server
ENTRYPOINT [ "npm", "run", "start-test-server"]
