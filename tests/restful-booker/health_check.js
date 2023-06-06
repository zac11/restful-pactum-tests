const { spec, request } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);

/**
 * Simple example of a heath check URL with HEAD call
 */
describe('Tests for the health check url',()=>{
    it(' checks if the health check passes', async()=>{
        await spec()
        .head('/ping')
        .expectStatus(201)
        .expectResponseTime(200)
        .expectHeader("content-type","text/plain; charset=utf-8")
        .expectHeader("content-length", "7")
    });
});