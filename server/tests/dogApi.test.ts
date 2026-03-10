import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('Dog API', () => {
    // positive test to call API to get random dog image
    test('GET /api/dogs/random returns random dog image', async () => {
        const response = await request(app)
            .get('/api/dogs/random')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('imageUrl')
        expect(typeof response.body.data.imageUrl).toBe('string')
    })

    // invalid route
    test('GET /api/dogs/invalid returns 404 for invalid route', async () => {
        const response = await request(app)
            .get('/api/dogs/invalid')
        expect(response.status).toBe(404)
        // expect response to contain error message
        expect(response.body).toHaveProperty('error')
        // verify that returned error message is correct
        expect(response.body.error).toBe('Route not found')
    })
})