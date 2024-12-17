import request from "supertest";
import {connectDB, server} from "../server";
import db from "../config/db";

// describe('GET /api', ()=> {
//     it('should send back a json response', async ()=> {
//         const res = await request(server).get('/api')
    
//         //expect = espero esto, toBe = que sea esto
//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)
//         expect(res.body.msg).toBe("Desde API")

//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe("desde api")
        
//     })
// })

jest.mock("../config/db")

describe('connectDB', ()=>{
    it("should handle database connection error", async ()=>{
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error("hubo un error al conectar la db"))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectarse a la db")
        )
    })
})