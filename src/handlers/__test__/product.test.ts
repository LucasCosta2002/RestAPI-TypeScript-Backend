import request from "supertest"
import { server } from "../../server"

describe('POST /api/products', ()=> {

    it("Should display validation erros", async ()=>{
        const res = await request(server).post("/api/products").send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it("Should validate that the price is greater than 0", async ()=>{
        const res = await request(server).post("/api/products").send({
            name: "monitor",
            price: 0
        })

        //esperamos
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        //no esperamos
        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it("Should validate that the price is a number and greater than 0", async ()=>{
        const res = await request(server).post("/api/products").send({
            name: "monitor",
            price: "0"
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(4)
    })

    it("Should create a new product", async ()=> {
        const res = await request(server).post("/api/products").send({
            name : "Mouse Test",
            price : 12.1
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(100)
        expect(res.body).not.toHaveProperty('errors')
    })    
})

describe('GET /api/products', ()=> {
    it("Should check if api/products url exist", async ()=>{
        const res = await request(server).get("/api/products")
        expect(res.status).not.toBe(404)
    })

    it("GET a JSON response with products", async ()=>{
        const res = await request(server).get("/api/products")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', ()=> {
    it("Should return a 404 response for a non-existent product", async ()=>{
        const productId = 9999;
        const res = await request(server).get(`/api/products/${productId}`)
        
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe('Product not found')
    })

    it("Should check a valid Id in the url", async ()=>{
        const res = await request(server).get(`/api/products/not-valid-url`)
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Id not valid")
    })

    it("get a JSON response for a single product", async ()=>{
        const res = await request(server).get(`/api/products/1`)
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', ()=> {

    it("Should check a valid Id in the url", async ()=>{
        const res = await request(server)
                        .put(`/api/products/not-valid-url`)
                        .send({
                            name : "monitor curvo",
                            availability : true,
                            price : 0
                        })
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe("Id not valid")
    })

    it("Should display validation error messages when updating a product", async ()=>{
        const res = await request(server).put(`/api/products/1`).send({})
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it("Should validate that the price is greater than 0", async ()=>{
        const res = await request(server)
                        .put(`/api/products/1`)
                        .send({
                            name : "monitor curvo",
                            availability : true,
                            price : 0
                        })
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Price must be greater than 0")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it("Should return a 404 response for a non-existent product", async ()=>{
        const productId = 11111;
        const res = await request(server)
                        .put(`/api/products/${productId}`)
                        .send({
                            name : "monitor curvo",
                            availability : true,
                            price : 30
                        })
        
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe('Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it("Should update an existing product with valid data", async ()=>{
        const res = await request(server)
                        .put(`/api/products/1`)
                        .send({
                            name : "monitor curvo",
                            availability : true,
                            price : 30
                        })
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')
    })

})


describe('PATH /api/products/:id', ()=> {

    it("Should return a 404 response for a non-existent product", async ()=>{
        const productId = 11111;
        const res = await request(server)
                        .patch(`/api/products/${productId}`)
                        .send({
                            name : "monitor curvo",
                            availability : true,
                            price : 30
                        })
        
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe('Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it("Should update the product availability", async ()=>{
        const res = await request(server)
                        .patch(`/api/products/2`)
                        .send({
                            name : "monitor curvo",
                            availability : false,
                            price : 30
                        })
        
        expect(res.status).toBe(200)
        expect(res.body.data.availability).toBe(false)

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('errors')
    })

})

describe('DELETE /api/products/:id', ()=>{

    it("should check a valid id", async ()=>{
        const res = await request(server).delete("/api/products/not-valid")

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe("Id not valid")
        expect(res.body.errors).toHaveLength(1)
    })

    it("should return a 404 response for a non-existent product", async ()=>{
        const productId = 2000;
        const res = await request(server).delete(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body.msg).toBe("Product not found")

        expect(res.status).not.toBe(200)
    })
   
    it("should delete a product", async ()=>{
        const res = await request(server).delete(`/api/products/1`)

        expect(res.status).toBe(200)
        expect(res.body.data).toBe("Product deleted")

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
    })
})