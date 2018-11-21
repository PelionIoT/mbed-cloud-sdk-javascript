FROM node:carbon
# Docker image for JavaScript SDK Test server

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm test
ENTRYPOINT [ "npm", "run", "integration"]
