import { afterEach, beforeEach, describe,expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { Request, Response } from 'express'
import * as dogController from "../controllers/dogController"

vi.mock('../controllers/dogController')

describe('Dog routes',() => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test('GET /api/dogs/random successful', async () => {
        // mock dogController
        // set expected json
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
            res.status(200).json({ 
                "success": true,
                "data": {
                    "imageUrl": "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
                    "status": "success"
                }
            })
        })

        // get request to /api/dogs/random
        const res = await request(app)
            .get('/api/dogs/random')

        // expect that returned status code is 200
        expect(res.status).toBe(200)

        // expect that returned JSON success value is true
        expect(res.body.success).toBe(true)

        // expect returned image url to contain mocked imageurl
        expect(res.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg")
    })

    // negative test returning 500
    test('GET /api/dogs/random returns 500 error', async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(500).json({ 
                    "success": false,
                    "error": "Failed to fetch dog image: Network error" 
                })
            }) 

        // make get request for /api/dog/random endpoint
        const res = await request(app)
            .get('/api/dogs/random')

        // expect that returned status code is 500
        expect(res.status).toBe(500)

        // expect that error is returned
        expect(res.body.error).toBe("Failed to fetch dog image: Network error")
    })
})



