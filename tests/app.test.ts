import * as request from 'supertest'
import {} from 'jest'
import { expect, should } from 'chai'
import * as app from '../src/server'

const route: String = '/accounts'
const INVALID_ACCOUNT: String = '123456789'
const GOOD_ACCOUNT: String = '5c56ff552491e1954be2357b'
const BAD_ACCOUNT: String = '5c56ff552491e1924be2357b'

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message')
      })
  })
})

describe('GET /health', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('status')
      })
  })
})

describe('GET /random-url', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .get('/random-url')
      .expect(404, done())
  })
})

describe('GET /accounts', () => {
  it('should return 200 OK', done => {
    request(app)
      .get('/accounts')
      .expect(200, done())
  })
})

describe('GET /accounts/:id', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .get(`${route}/${INVALID_ACCOUNT}`)
      .expect(404, done)
  })

  it('should return 404 Not Found', done => {
    request(app)
      .get(`${route}/${BAD_ACCOUNT}`)
      .expect(404, done)
  })

  it('should return 200 OK', done => {
    request(app)
      .get(`${route}/${GOOD_ACCOUNT}`)
      .expect(200, done())
  })
})

describe('POST /accounts', () => {
  it('should return 400 Bad Request', done => {
    request(app)
      .post(route)
      .send({ email: 'some@email.com' })
      .expect(400, done())
  })

  it ('should return 400 Bad Request', (done) => {
    request(app)
      .post(route)
      .send({email: 'some.email.com'})
      .expect(400, done);
  });

  it('should return 201 Created', done => {
    request(app)
      .post(route)
      .type('form')
      .send({ email: 'tester@gmail.com' })
      .expect(201, done())
  })
})

describe('PUT /accounts/:id', () => {
  let ACCOUNT_ID: String = '5c5713029bcad21783c6b7ee'
  it('should return 404 Not Found', done => {
    request(app)
      .put(`${route}/${INVALID_ACCOUNT}`)
      .send({ email: 'some@email.com' })
      .expect(404, done)
  })

  // it ('should return 400 Bad Request', (done) => {
  //   request(app)
  //     .put(`${route}/${ACCOUNT_ID}`)
  //     .send({email: 'some.email.com'})
  //     .expect(400, done);
  // });

  it('should return 204 No Content', done => {
    request(app)
      .put(`${route}/${ACCOUNT_ID}`)
      .send({ email: 'tester@gmail.com' })
      .expect(204, done)
  })
})

describe('DELETE /accounts/:id', () => {
  it('should return 404 Not Found', done => {
    request(app)
      .delete(`${route}/${INVALID_ACCOUNT}`)
      .expect(404, done())
  })

  it('should return 204 No Content', done => {
    request(app)
      .delete(`${route}/${GOOD_ACCOUNT}`)
      .expect(204, done())
  })
})
