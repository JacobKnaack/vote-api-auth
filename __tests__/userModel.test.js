'use strict';

const { sequelize, tables } = require('../lib/models');

let recordId = null;

beforeAll(async () => {
  try {
    await sequelize.sync();
  } catch(e) {
    console.log(e);
  }
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the user model', () => {
  test('Should create a user record', async () => {
    let record = await tables.user.create({name: 'test', user_id: 'auth0-id'});
    recordId = record.id;
    expect(record.name).toEqual('test');
    expect(record.id).toBeTruthy();
  });

  test('Should read a user record by name', async () => {
    let record = await tables.user.findOne({ where: {name: 'test'} });
    expect(record.name).toEqual('test');
    expect(record.id).toBeTruthy();
  });
  test('Should update a user record using id and name', async () => {
    let record = await tables.user.update(
      {name: 'test3'},
      { 
        where: { id: recordId },
        returning: true
      });
    console.log(record);
    expect(record).toBeTruthy();
  });
});