const { spec, request, stash } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:3001';
request.setBaseUrl(baseURL);


/**
 * This is an example of DELETE request 
 */

describe('Deletes a booking id', ()=>{

    it('creates a token', async()=>{
        await spec()
        .post('/auth')
        .withHeaders("Content-Type","application/json")
        .withJson({
            "username" : "admin",
            "password" : "password123"
        })
        .expectStatus(200)
        .inspect()
        .stores("auth-token","token");
    });

    it('gets the list of the bookings and fetches fifth id ', async()=>{
        await spec()
        .get('/booking')
        .stores('fifth-id', '[5].bookingid')
        .inspect();
    });

    it('deletes that booking id', async()=>{
        await spec()
        .delete('/booking/{id}')
        .withHeaders({
            "cookie": `token=$S{auth-token}`          
        })
        .withPathParams('id', '$S{fifth-id}')
        .expectStatus(201)
        .inspect()
    });

    it(' validates that the id is now deleted', async()=>{
        await spec()
        .get('/booking/{id}')
        .withPathParams('id', '$S{fifth-id}')
        .expectStatus(404)
        .inspect()
    })


})