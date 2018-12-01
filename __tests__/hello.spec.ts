import { Thing } from '../';

describe('hello I1820 client', () => {
  let client = new Thing('127.0.0.1:1883', 'tid', 'key');

  test('send number', () => {
    client.log({
      'temperautre': 18,
      'humidity': 68
    })
  });

  test('send boolean', () => {
    client.log({
      'motion': true,
    })
  });

  test('send object', () => {
    client.log({
      'location': {
        'type': 'point',
        'coordinates': [ 10, 10 ],
      },
    })
  });
});
