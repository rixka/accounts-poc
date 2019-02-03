import * as request from 'supertest';
import {} from 'jest';
import { expect, should } from 'chai';
import * as app from '../src/server';

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
});

describe('GET /health', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('status');
      });
  });
});

describe('GET /random-url', () => {
  it('should return 404 Not Found', () => {
    return request(app)
      .get('/random-url')
      .expect(404)
  });
});

describe('GET /accounts', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/accounts')
      .expect(200, done());
  });
});

describe('GET /accounts/:id', () => {
  const route: String = '/accounts';
  const BAD_ACCOUNT: String = '123456789';
  const GOOD_ACCOUNT: String = '5c56ff552491e1954be2357b';

  it('should return 404 Not Found', (done) => {
    request(app).get(`${route}/${BAD_ACCOUNT}`)
      .expect(404, done);
  });

  it('should return 200 OK', (done) => {
    request(app).get(`${route}/${GOOD_ACCOUNT}`)
      .expect(200, done());
  });
});
