const { spec, request, stash } = require('pactum');
require('dotenv').config();
const { expect } = require("chai")

const isCI = process.env.CI;
if(isCI){
    const baseURL = 'https://restful-booker.herokuapp.com';
    console.log(`${baseURL}`)
}else{
    const baseURL = 'http://localhost:3001';
    console.log(`${baseURL}`)
}
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
        .stores("auth-token","token");
    });

    it('gets the list of the bookings and fetches fifth id ', async()=>{
        await spec()
        .get('/booking')
        .stores('fifth-id', '[5].bookingid')
    });

    it('deletes that booking id', async()=>{
        await spec()
        .delete('/booking/{id}')
        .withHeaders({
            "cookie": `token=$S{auth-token}`          
        })
        .withPathParams('id', '$S{fifth-id}')
        .expectStatus(201)
    });

    it(' validates that the id is now deleted', async()=>{
        await spec()
        .get('/booking/{id}')
        .withPathParams('id', '$S{fifth-id}')
        .expectStatus(404)
    })


})