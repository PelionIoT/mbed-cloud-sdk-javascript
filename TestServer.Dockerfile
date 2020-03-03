FROM node:lts

WORKDIR /testserver

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY ./test/integration ./test/integration
COPY ./tsconfig.json ./tsconfig.json
COPY ./integration.tsconfig.json ./integration.tsconfig.json

RUN yarn clean:integration
RUN yarn compile:integration

EXPOSE 5000

CMD ["node", "test/integration/build/test/integration/codeCoverage.js"]