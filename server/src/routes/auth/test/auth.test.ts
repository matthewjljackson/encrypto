import { userStub } from './stubs/userStub';
import request from 'supertest';
import app from '../../../index';
import mongoose, { Connection } from 'mongoose';

describe('Auth route', () => {
  let dbConnection: Connection;
  let user: {
    username: string;
    password: string;
  };

  beforeAll(async () => {
    dbConnection = await mongoose.createConnection(
      'mongodb://localhost:27017/encrypto-test'
    );
  });

  beforeEach(() => {
    user = userStub();
  });

  afterAll(() => {
    dbConnection.dropDatabase();

    app.close();
  });

  afterEach(() => {
    dbConnection.dropCollection('users');
  });

  describe('/POST /register', () => {
    it('should return a user with id and username', async () => {
      const response = await request(app).post('/signup').send(user);
      expect(response.body).toEqual({
        id: expect.any(String),
        username: user.username,
      });
    });
  });

  it('it should responds with 201', async () => {
    await request(app).post('/signup').send(user).expect(201);
  });
});
