'use strict';

const { handleUser } = require('../lib/middlewares');
const { sequelize, tables} = require('../lib/models');

let testUser = null;
let sub = '4yiuhfgo87wy4t87yf';

beforeAll(async () => {
  await sequelize.sync();
  testUser = await tables.user.create({ name: 'user-test', user_id: sub });
});
afterAll(async () => {
  await sequelize.drop();
});

describe('handle User middleware', () => {
   test('Should call create a new user and call next', async () => {
    let req = {
      oidc: {
        user: { name: 'tester', sub: 'new-sub' },
      }
    }
    let res = {}
    let next = jest.fn();

    await handleUser(tables.user)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.records).toBeTruthy();
    expect(req.records.user.name).toEqual('tester');
    expect(req.records.user.user_id).toEqual('new-sub');
  });
  test('Should attach an existing user model instance if authenticated', async () => {
    let req = {
      oidc: {
        user: { name: 'user-test', sub }
      }
    }
    let res = {}
    let next = jest.fn();

    await handleUser(tables.user)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.records.user.name).toEqual('user-test');
  });
  test('Should call an next if no user object is present', async () => {
    let req = {
      oidc: {
        user: {}
      }
    }
    let res = {}
    let next = jest.fn();
    await handleUser(tables.user)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.records).not.toBeTruthy();
  });
})