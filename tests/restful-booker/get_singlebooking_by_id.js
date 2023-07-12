const { spec, request, handler } = require('pactum');
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


it('tests individual booking id', async () => {

    handler.addCaptureHandler('first post id', (ctx) => {
        return ctx.res.json[0].bookingid;
    });
    
    const tokenid =  await spec()
            .get('/booking')
            .expectStatus(200)
            .stores('FirstPostId', '#first post id');
    

    await spec()
        .get(`/booking/{id}`)
        .withHeaders('Accept', 'application/json')
        .withPathParams('id', '$S{FirstPostId}')
        .expectStatus(200);


});


it(' validates the keys in the response',async ()=>{
    handler.addCaptureHandler('first post id', (ctx) => {
        return ctx.res.json[0].bookingid;
    });
    
    await spec()
            .get('/booking')
            .expectStatus(200)
            .stores('FirstPostId', '#first post id');
    

    await spec()
        .get(`/booking/{id}`)
        .withHeaders('Accept', 'application/json')
        .withPathParams('id', '$S{FirstPostId}')
        .expect(ctx=>{
            expect(ctx.res.json.firstname).to.be.an('string');
        });
    
});

it('tests that the booking dates have checkin and checkout dates', async()=>{

    await spec()
        .get(`/booking/{id}`)
        .withHeaders('Accept', 'application/json')
        .withPathParams('id', '$S{FirstPostId}')
        .expect(ctx=>{
            expect(ctx.res.json.bookingdates).to.be.an('object').that.has.all
            .keys(
                "checkin",
                "checkout");
        });
})



