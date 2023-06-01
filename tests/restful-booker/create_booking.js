const { spec, request, stash } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);

const { faker, fa } = require('@faker-js/faker');

describe(' Create a new booking', ()=>{
    it('creates a new booking', async ()=>{
      stash.addDataTemplate({
            "NewBooking":{
                "firstname": faker.person.firstName(),
                "lastname": faker.person.lastName(),
                "totalprice": faker.finance.amount({ min: 100, max: 5000 }),
                "depositpaid": faker.datatype.boolean({ probability: 0.3 }),
                "bookingdates":{
                    "checkin": faker.date.soon({ days: 10 }),
                    "checkout": faker.date.soon({ days: 25 })
                } ,
                "additionalneeds": faker.airline.airline()
            }
        });

    

        await spec()
        .post('/booking')
        .withHeaders({
            "Content-Type":"application/json",
            "Accept": "application/json"
        })
        .withJson({
            '@DATA:TEMPLATE@': 'NewBooking',
        })
        .inspect()
        .expectStatus(200)
    });
})
