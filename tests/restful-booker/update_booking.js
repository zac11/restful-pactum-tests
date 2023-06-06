const { spec, request, stash } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);

const { faker, fa } = require('@faker-js/faker');

/**
 * This is an example of a PUT request
 */
describe('Update an existing booking', ()=>{

    stash.addDataTemplate({
        "Update":{
            "firstname": faker.person.firstName(),
            "lastname": faker.person.lastName(),
            "totalprice": faker.finance.amount({ min: 100, max: 5000 }),
            "depositpaid": faker.datatype.boolean({ probability: 0.3 }),
            "bookingdates":{
                "checkin": faker.date.soon({ days: 10 }),
                "checkout": faker.date.soon({ days: 25 })
            } 
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

    it('gets the list of the bookings and fetches first id ', async()=>{
        await spec()
        .get('/booking')
        .stores('first-id', '[0].bookingid')
    });

    it('updates the id that is fetched', async()=>{
        await spec()
        .put('/booking/{id}')
        .withHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "cookie": `token=$S{auth-token}`
            
        })
        .withPathParams('id', '$S{first-id}')
        .withJson({
            '@DATA:TEMPLATE@': 'Update',  
        })
    });
})