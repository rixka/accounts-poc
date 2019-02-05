import * as request from 'supertest'
import {} from 'jest'
import { expect, should } from 'chai'
import * as app from '../src/server'

const ROUTE: String = '/api/accounts'
const INVALID_ACCOUNT: String = '123456789'
const GOOD_ACCOUNT: String = '5c56ff552491e1954be2357b'
const BAD_ACCOUNT: String = '5c56ff552491e1924be2357b'

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message')
      })
  })
})

describe('GET /health', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/health')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('status')
      })
  })
})

describe('GET /random-url', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .get('/api/random-url')
      .expect(404, done())
  })
})

describe('GET /accounts', () => {
  it('should return 200 OK', done => {
    request(app)
      .get(ROUTE)
      .expect(200, done())
  })
})

describe('GET /accounts/:id', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .get(`${ROUTE}/${INVALID_ACCOUNT}`)
      .expect(404, done)
  })

  it('should return 404 Not Found', done => {
    request(app)
      .get(`${ROUTE}/${BAD_ACCOUNT}`)
      .expect(404, done)
  })

  it('should return 200 OK', done => {
    request(app)
      .get(`${ROUTE}/${GOOD_ACCOUNT}`)
      .expect(200, done())
  })
})

describe('POST /accounts', () => {
  it('should return 400 Bad Request', done => {
    request(app)
      .post(ROUTE)
      .send({ email: 'some@email.com' })
      .expect(400, done())
  })

  it('should return 400 Bad Request', done => {
    request(app)
      .post(ROUTE)
      .send({ email: 'some.email.com' })
      .expect(400, done)
  })

  it('should return 201 Created', done => {
    request(app)
      .post(ROUTE)
      .send({ email: 'tester@gmail.com' })
      .expect(201, done())
  })
})

describe('PUT /accounts/:id', () => {
  let ACCOUNT_ID: String = '5c5713029bcad21783c6b7ee'
  it('should return 404 Not Found', done => {
    request(app)
      .put(`${ROUTE}/${INVALID_ACCOUNT}`)
      .send({ email: 'some@email.com' })
      .expect(404, done)
  })

  it('should return 400 Bad Request', done => {
    request(app)
      .put(`${ROUTE}/${ACCOUNT_ID}`)
      .send({ email: 'some.email.com' })
      .expect(400, done)
  })

  it('should return 204 No Content', done => {
    request(app)
      .put(`${ROUTE}/${ACCOUNT_ID}`)
      .send({ email: 'tester@gmail.com' })
      .expect(204, done)
  })
})

describe('DELETE /accounts/:id', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .delete(`${ROUTE}/${INVALID_ACCOUNT}`)
      .expect(404, done())
  })

  it('should return 204 No Content', done => {
    request(app)
      .delete(`${ROUTE}/${GOOD_ACCOUNT}`)
      .expect(204, done())
  })
})
