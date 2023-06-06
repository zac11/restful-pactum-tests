const { spec, request, stash } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);

const { faker, fa } = require('@faker-js/faker');

/**
 * This is an example of a PATCH request
 */
describe('Update an existing booking', ()=>{

    /**
     * We'll only create three fake data points for patch request
     */
    stash.addDataTemplate({
        "PartialUpdate":{
            "firstname": faker.person.firstName(),
            "lastname": faker.person.lastName(),
            "totalprice": faker.finance.amount({ min: 100, max: 5000 }),
        }
    });

    it('creates a token', async()=>{
        await spec()
        .post('/auth')
        .withHeaders("Content-Type","application/json")
        .withJson({
            "username" : "admin",
            "password" : "password123"
        })
        .expectStatus(200)
        .stores("auth-token","token");
    });

    it('gets the list of the bookings and fetches third id ', async()=>{
        await spec()
        .get('/booking')
        .stores('third-id', '[3].bookingid')
    });

    it('partially the id that is fetched', async()=>{
        await spec()
        .patch('/booking/{id}')
        .withHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "cookie": `token=$S{auth-token}`
            
        })
        .withPathParams('id', '$S{third-id}')
        .withJson({
            '@DATA:TEMPLATE@': 'PartialUpdate',  
        })
    });
})