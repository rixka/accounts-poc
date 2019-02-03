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
