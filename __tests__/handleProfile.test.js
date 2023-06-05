'use strict';

const { handleProfile } = require('../lib/middlewares');

describe('Testing the Profile render middleware', () => {
  test('Should call render method when a user is authenticated', () => {
    let root = 'path/to/views';
    let req = {
      oidc: {
        isAuthenticated: jest.fn(() => true),
      },
      user: {
        name: 'test',
        picture: 'test.png'
      }
    }
    let res = {
      render: jest.fn(),
      redirect: jest.fn()
    }
    let next = jest.fn();
  
    handleProfile(root)(req, res, next);
    expect(res.render).toHaveBeenCalled();
  });

  test('Should redirect user to login when user is not authenticated', () => {
    let root = 'path/to/views';
    let req = {
      oidc: {
        isAuthenticated: jest.fn(() => false),
      },
      user: {
        name: 'test',
        picture: 'test.png'
      }
    }
    let res = {
      render: jest.fn(),
      redirect: jest.fn()
    }
    let next = jest.fn();
    handleProfile(root)(req, res, next);
    expect(res.redirect).toHaveBeenCalled();
  })
});