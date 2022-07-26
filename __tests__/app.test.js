const app = require('../app')
const request = require('supertest');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');

beforeEach(() => seed(testData));
afterAll(() => { return db.end() });


describe('/api/users/:username', () => {
    describe('GET', () => {
        test('Status: 200, response body should be an object with username, avatar_url and name', () => {
            return request(app).get('/api/users/one').expect(200).then(({ body }) => {
                expect(body.user).toEqual(expect.objectContaining({
                    username: "one",
                }));
            })

        });
        test('Status 404, username is correct format but not in the table', () => {
            return request(app).get('/api/notHere').expect(404).then(({ body }) => {
                expect(body.msg).toBe('Path Not Found')
            })
        });

    });
    describe('POST', () => {
        test('Status: 201, responds with new article object', () => {
            const toSend = {
                password: 'jamie123',
            }
            return request(app).post('/api/users/two').send(toSend).expect(200).then(({ body }) => {
                expect(body).toEqual(expect.objectContaining({
                    password: 'jamie123',
                }))
            })
        })
        test('Status: 400 missing properties form the request body', () => {
            const toSend = {}
            return request(app).post('/api/users/one').send(toSend).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        });
        test('Status: 400 wrong data type in the request body', () => {
            const toSend = { password: 999 }
            return request(app).post('/api/users/three').send(toSend).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })

        });
        test('Status: 400, given extra properties in the request body that are unnececerry', () => {
            const toSend = {
                banana: "what you doing here?",
                password: "jamie123"
            }
            return request(app).post('/api/users/two').send(toSend).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        });
    });
});


describe('/api/users', () => {
    describe('POST', () => {
        test('Status: 201, responds with the newly posted user', () => {
            const newUser = {
                username: 'test',
                email: 'test@hotmail.com',
                password: 'Password123',
            }
            return request(app).post('/api/users').send(newUser).expect(201).then(({ body }) => {
                expect(body).toEqual(expect.objectContaining({
                    username: 'test',
                    email: 'test@hotmail.com',
                    password: 'Password123',
                }))
            })
        });
        test('Status: 400 missing properties form the request body', () => {
            const invalidBody = {
                username: 'test',
                password: 'Password123',
            }
            return request(app).post('/api/users').send(invalidBody).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
            })
        });
        test('Status: 400 wrong data type in the request body', () => {
            const invalidBody = {
                username: 123,
                body: 123,
                password: 123
            }
            return request(app).post('/api/users').send(invalidBody).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
            })
        });
        test('Status: 400, given extra properties in the request body that are unnecessary', () => {
            const newComment = {
                username: "test",
                password: "123test",
                email: "test@hotmail.com",
                extra: "extra_stuff",
                extra: "not needed"
            }
            return request(app).post('/api/users').send(newComment).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
            })
        });
    })
})




describe('/*', () => {
    test('Status: 404, path not found when a request is sent to the wrong path', () => {
        return request(app).get('/api/typo').expect(404).then(({ body }) => {
            expect(body.msg).toBe('Path Not Found')
        })
    });
});