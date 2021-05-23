<p align="center">
  <a href="https://usd2mxn.herokuapp.com/api-docs/" target="blank"><img src="/docs/sombrero.png" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center"> Exchange Rate api developed with <a href="http://nestjs.com/" target="_blank">Nestjs</a></p>
    <p align="center">
  <a href="https://github.com/DiogoPires22/usd_2_mxn/actions/workflows/deploy.yaml/badge.svg?branch=main)]" target="_blank"><img src="https://github.com/DiogoPires22/usd_2_mxn/actions/workflows/deploy.yaml/badge.svg?branch=main)]" /></a>
  <a href="https://coveralls.io/repos/github/DiogoPires22/usd_2_mxn/badge.svg?branch=main" target="_blank"><img src="https://coveralls.io/repos/github/DiogoPires22/usd_2_mxn/badge.svg?branch=main" alt="Coverage" /></a>
</p>

## Documentation

[Swagger](https://usd2mxn.herokuapp.com/api-docs/).
[Postman](/docs/postman.json).

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash

# development mode
$ FIXER_TOKEN={YOUR_FIXER_KEY} BANXICO_TOKEN={YOUR_BANXICO_KEY} npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ npm run test:cov
```