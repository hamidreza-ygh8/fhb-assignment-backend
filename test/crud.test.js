const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index');

describe('GET /', () => {
  it('should return "Hello World!"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).to.equal(200);
    expect(res.text).to.equal('<h1>Hello World!</h1>');
  });
});

describe('GET /api/notes', () => {
    it('should return all existing notes', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(3);
    });
});

describe('POST /api/notes', () => {
  it('should return a new note', async () => {
    const res = await request(app).post('/api/notes').send(
        { 
            content: 'We had a great experience with TDD'
        }
    );
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('content', 'We had a great experience with TDD');
  });
});

describe('Get /api/notes/:id', () => {
    it('should return a specific note', async () => {
      const res = await request(app).get('/api/notes/2');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('content', 'Browser can execute only Javascript');
      expect(res.body).to.have.property('date', '2022-01-10T18:39:34.091Z');
    });
});

describe('DELETE /api/notes/:id', () => {
    it('should delete a specific note', async () => {
      const res = await request(app).delete('/api/notes/2');
      expect(res.statusCode).to.equal(204);
      const getRes = await request(app).get('/api/notes');
      expect(getRes.statusCode).to.equal(200);
      expect(getRes.body).to.have.lengthOf(3);
    });
  });

