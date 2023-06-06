# restful-pactum-tests

## API Tests on Restful Booker service using Pactum JS

This repo contains API tests for Restful booker service - using Pactum JS.

### Set Up
To set up the tests, use the `docker-compose` command to pull and create the backend for restful booker service.

Run this once `docker` is up and running 

`docker-compose -f docker-compose.startup.yml up -d`



## Install the dependencies
Once the restful service is up you can use `npm i` or `npm install` from the root directory of the project to install all the dependencies

`faker` is used for creating fake data for the test data creation.
`chai` is used for assertions
`dotenv` is used for maintaining env specific configs
`mocha` is used as the test runner
`mocahawesome` is used for reporting purposes
`pactum` is used for making the API requests.


## Run the tests

To run all the tests, run `npm run test` - it will run all the tests inside the `restful-booker` directory with the extension `*.js`


This will run the tests and create a new report in the `mochawesome-report` directory.

## Run in docker

To run all the tests in docker container follow the following steps
- Create a build `docker build --no-cache -t tagname . `  replace `tagname` with whatever name you want to tag the tests.

- Run the tests `docker run -it tagname`


## Run in CI

This uses Github Actions to run the tests. A GA workflow file is present in the `.github/workflows` directory. 

