import { userStub } from './stubs/userStub';
import { coinStub } from './stubs/coinStub';
import app from '../../index';
import mongoose, { Connection } from 'mongoose';
import { User, Coin } from '../User'

describe('models', () => {
  let dbConnection: Connection;
  let user: {
    username: string;
    password: string;
  };
  let coin: {
    owner: string;
    symbol: string;
    openPrice: number;
    quantity: number;
    timestamp: number;
  };

  beforeAll(async () => {
    dbConnection = await mongoose.createConnection(
      'mongodb://localhost:27017/encrypto-test'
    );
  });

  afterAll(() => {
    dbConnection.dropCollection('users');
    dbConnection.dropDatabase();

    app.close();
  });

  //If you use environment variable for testing, it’s good to test it to notify the people who run the test.
  it("Should failed when env not test ", () => {
      expect(process.env.NODE_ENV).toEqual("test");
    });

  describe('User model', () => {

    beforeEach(() => {
      user = userStub();

    });

    it('should throw no errors if login details are provided', function(done) {
        const newUser = new User({username: user.username, password: user.password } );
        newUser.validate(function(err) {
          expect(err).toBeNull();
          done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        const newUser = new User({username: '', password: user.password } );
        newUser.validate(function(err) {
          expect(err).toBeTruthy()
          done();
        });
    });

    it('should be invalid if password is empty', function(done) {
        const newUser = new User({username: user.username, password: '' } );
        newUser.validate(function(err) {
          expect(err).toBeTruthy()
          done();
        });
    });
    it('should be invalid if password is less than 6 characters', function(done) {
        const newUser = new User({username: user.username, password: '12345' } );
        // console.log()
        newUser.validate(function(err) {
          expect(err).toBeTruthy()
          done();
        });
    });
  });

  describe('Coin model', () => {

    beforeEach(() => {
      coin = coinStub();
    });

    it('should throw no error if credentials are provided', function(done) {
        const newCoin = new Coin({
          owner: coin.owner,
          symbol: coin.symbol,
          openPrice: coin.openPrice,
          quantity: coin.quantity,
          timestamp: coin.timestamp
        } );

        newCoin.validate(function(err: any) {
          console.log(err)
          done();
        });
    });
  });
});
