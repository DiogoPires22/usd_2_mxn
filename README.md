<p align="center">
  <a href="https://usd2mxn.herokuapp.com/api-docs/" target="blank"><img src="/docs/mario.png" width="200" height="250" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center"> Exchange Rate api developed with <a href="http://nestjs.com/" target="_blank">Nestjs</a></p>
    <p align="center">
  <a href="https://img.shields.io/github/checks-status/DiogoPires22/usd_2_mxn/main" target="_blank"><img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/DiogoPires22/usd_2_mxn/main"></a>
<a href='https://coveralls.io/github/DiogoPires22/usd_2_mxn?branch=main'><img src='https://coveralls.io/repos/github/DiogoPires22/usd_2_mxn/badge.svg?branch=main&kill_cache=1' alt='Coverage Status' /></a>
</p>
<p align="center">
<a href='/eslint-badge.svg'><img src='/eslint-badge.svg' alt='Eslint Badge' /></a></p>

## Documentation

* [Swagger](https://usd2mxn.herokuapp.com/api-docs/).
* [Postman](/docs/postman.json).

## 
* NestJs
* Auth0
* passport
* Swagger
* Jest
* docker
* cachemanager
* throttle (rate limit 5 request/min)

## Installation

```bash
$ yarn install
```

## Running the app

```bash

# development mode
$ ISSUER_URL={YOUR_ISSUER_URL} ISSUER_URL={AUDIENCE_URL} FIXER_TOKEN={YOUR_FIXER_KEY} BANXICO_TOKEN={YOUR_BANXICO_KEY} npm run start:dev

# production mode
$ npm run start:prod
```

## Running Docker
```bash
# build immage
$ docker build -t usd2mxn .

# run container
$ docker run \
  --env ISSUER_URL={YOUR_ISSUER_URL} --env PORT=3000 \
  --env AUDIENCE_URL={YOUR_AUDIENCE_URL} \
  --env FIXER_TOKEN={YOUR_FIXER_TOKEN} \
  --env BANXICO_TOKEN={YOUR_BANXICO_TOKEN} \
  -p 3000:3000 \
usd2mxn
```


## Test

```bash
# unit tests
$ yarn test

# test coverage
$ npm run test:cov
```