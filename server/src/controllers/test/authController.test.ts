import { loginPost, registerPost } from '../authController';
import { userStub } from './stubs/userStub';

describe('Auth Controller', () => {
  interface IUser {
    username: string;
    password: string;
  }

  let user: IUser;

  describe('Login', () => {
    it('should be defined', () => {
      expect(loginPost).toBeDefined();
    });
  });

  describe('Register', () => {
    beforeEach(() => {
      user = userStub();
    });

    it('should be defined', () => {
      expect(registerPost).toBeDefined();
    });
  });
});
