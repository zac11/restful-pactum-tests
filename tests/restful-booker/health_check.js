const { spec, request } = require('pactum');
require('dotenv').config();

const isCI = process.env.NODE_ENV === 'CI';
const baseURL = isCI ? process.env.BASE_URL_CI : process.env.BASE_URL_LOCAL;

// Use the baseURL variable in your code
console.log('Base URL:', baseURL);

request.setBaseUrl(baseURL);

/**
 * Simple example of a heath check URL with HEAD call
 */
describe.only('Tests for the health check url',()=>{
    it(' checks if the health check passes', async()=>{
        await spec()
        .head('/ping')
        .inspect()
        .expectStatus(201)
        .expectResponseTime(200)
        .expectHeader("content-type","text/plain; charset=utf-8")
        .expectHeader("content-length", "7")
        
    });
});