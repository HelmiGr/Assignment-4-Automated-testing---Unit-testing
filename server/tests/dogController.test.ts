import { describe, expect, test,vi } from "vitest"
import { getDogImage } from '../controllers/dogController'
import * as dogService from '../services/dogService'

// mock dogService
vi.mock('../services/dogService')

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe('DogController.getDogImage', () => {
    // positive test for dogController
    test('Return dog image with valid request', async () => {
        // create mock response for getDogImage
        const res = createMockResponse()

        const payload = { 
            "imageUrl": "https://images.dog.ceo/breeds/springer-english/n02102040_1519.jpg",
            "status": "success" 
        }

        // mock/stub value returned by dogService
        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload)
        
        await getDogImage({} as any, res)

        // expect returned JSON to contain success true and mocked JSON returned by service
        expect(res.json).toHaveBeenCalledWith({ 
            success: true,
            data: payload
         })
    })
})