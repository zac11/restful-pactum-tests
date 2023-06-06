const { spec, request } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);

/**
 * This is an example of GET request
 */
describe(' Get all the booking ids and tests for that',()=>{
    it('tests the API is working ', async()=>{
        await spec()
        .get('/booking')
        .expectStatus(200);
    });

    it('tests that response recieved within the SLA - 1000 ms', async()=>{
        await spec()
        .get('/booking')
        .expectResponseTime(1000);
    });

    it('tests that response is not empty', async()=>{
        await spec()
        .get('/booking')
        .expect(ctx=>{
            expect(ctx.res.json).to.not.have.lengthOf(0);
           
        });
        
    });

    it(' tests that the response is an object', async()=>{
        await spec()
        .get('/booking')
        .expect(ctx=>{
            expect(ctx.res.json[0]).to.be.an('object');
           
        });
        
    });

    it(' tests that the response has given keys', async()=>{
        await spec()
        .get('/booking')
        .expect(ctx=>{
            expect(ctx.res.json[0]).to.have.property('bookingid').that.is.a('number');
           
        });
       
    });
});