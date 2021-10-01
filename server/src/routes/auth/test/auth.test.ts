import { userStub } from './stubs/userStub';
import request from 'supertest';
import server, { app } from '../../../index';
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

  afterAll(async () => {
    await dbConnection.dropDatabase();

    server.close();
  });

  describe('/POST /register', () => {
    beforeEach(() => {
      user = userStub();
    });

    it('should return a user with id and username', async () => {
      const response = await request(app).post('/signup').send(user);
      expect(response.body).toEqual({
        id: expect.any(String),
        username: user.username,
      });
    });

    it('should not allow a user to register with a taken username', async () => {
      await request(app).post('/signup').send(user).expect(400);
    });

    it('should responds with 201 and application/json in header', async () => {
      await request(app)
        .post('/signup')
        .send({
          username: 'johndoe2',
          password: 'johndoe2',
        })
        .expect(201)
        .expect('Content-Type', /json/);
    });

    it('should responds with 400 with no data', async () => {
      await request(app).post('/signup').send().expect(400);
    });
  });

  describe('/POST /login', () => {
    it('should return a user with id username, and coins object', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).toEqual({
        id: expect.any(String),
        username: user.username,
      });
    });

    it('should return 400 and error message if user does not exist', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'janedoe',
          password: 'janedoe',
        })
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          password: '',
          username: 'that username does not exist',
        },
      });
    });

    it('should return a cookie with value jwt when login is valid', async () => {
      const response = await request(app).post('/login').send(user).expect(200);

      expect(response.headers['set-cookie'][0]).toMatch(/jwt=/);
    });

    it('should return 400 and invalid login if the password is incorrect', async () => {
      await request(app)
        .post('/login')
        .send({
          username: 'johndoe',
          password: 'asdf',
        })
        .expect(400, {
          errors: {
            username: '',
            password: 'incorrect password',
          },
        });
    });
  });

  describe('/GET /coins', () => {
    it('should return 401 code if not authenticated ', async () => {
      await request(app).get('/coins').expect(401);
    });

    it('should return the users coins upon successful login and request', async () => {
      const login = await request(app).post('/login').send(user);

      const tokenFromHeader = login.headers['set-cookie'][0]
        .split('=')[1]
        .split(' ')[0];

      const validToken = tokenFromHeader.substring(
        0,
        tokenFromHeader.length - 1
      );

      const response = await request(app)
        .get('/coins')
        .set('Cookie', `jwt=${validToken}`)
        .expect(200);

      expect(response.body).toEqual(expect.arrayContaining([]));
    });
  });
});
