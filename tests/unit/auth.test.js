import app from '../../src/app.js'
import request from 'supertest';
import { Signup } from '../../src/controllers/auth.controller.js';
import User from '../../src/models/user.model.js';

jest.mock("../../src/models/user.model.js");

const mockRequest = (body = {}, params = {}, query = {}) => ({
    body,
    params,
    query,
});
  
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};

describe("Auth Controller", ()=>{

    describe("signup",()=>{

       test('should return 400 if fields are missing', async() => {
        
        const req = mockRequest({email: 'iqbal@gmail.com',password:"123",fullName:""});
        const res = mockResponse(); //{status: jest.fn(), json:jest.fn()};

        await Signup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message:"All fields are required"});
        // const response = await request(app).post("/api/auth/signup").send({
        //     email: "iqbal@gmail.com",
        //     password:"123",
        // });

        // expect(response.status).toBe(400);
        // expect(response.body.message).toBe('All fields are required');
        })

    //     test('should return 400 if password less than 6 characters', async() => { 
    //         const response = await request(app).post("/api/auth/signup").send({
    //             email: "iqbal@gmail.com",
    //             fullName: "iqbal",
    //             password:"123",
    //         });
    
    //         expect(response.status).toBe(400);
    //         expect(response.body.message).toBe('Password must be at least 6 characters');
    //     })

    })
})