FROM node:10

WORKDIR /testserver

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./test/integration ./test/integration
COPY ./tsconfig.json ./tsconfig.json
COPY ./integration.tsconfig.json ./integration.tsconfig.json

RUN npm run clean:integration
RUN npm run compile:integration

EXPOSE 5000

CMD ["node", "test/integration/build/test/integration/codeCoverage.js"]