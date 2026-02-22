import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe('DogService.getRandomDogImage', () => {

    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
    })

    // positive test for dogService
    test('Returns imageUrl with dog image and status', async () => {
        // mock/stub response
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ 
                "message": "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpq",
                "status": "success"
             })
        } as Response)

        const result = await getRandomDogImage()

        // service calls mocked fetch once (use toHaveBeenCalledOnce)
        expect(fetch).toHaveBeenCalledOnce()

        // expect imageUrl to be the same as the message in mocked data
        expect(result.imageUrl).toBe(
            "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpq",
        )
        // expect returned status to be success
        expect(result.status).toBe("success")
    })

    test('Throws error when API call fails', async () => {
        vi.mocked(fetch).mockResolvedValue({
            "ok": false,
            "status": 500
        } as Response)

        await expect(getRandomDogImage()).rejects.toThrow(
            `Dog API returned status 500`
        )
    })
})