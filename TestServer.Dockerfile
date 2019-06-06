FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./test/integration ./test/integration
COPY ./tsconfig.json ./tsconfig.json
COPY ./integration.tsconfig.json ./integration.tsconfig.json

RUN npm run clean:integration
RUN npm run compile:integration

ENTRYPOINT ["node", ".test/integration/build/test/integration/codeCoverage.js"]