import { ListItem } from '../src'

test('constructor', () => {
  const next = new ListItem(10);

  expect(new ListItem(0, next).value).toEqual(0);
  expect(new ListItem(0, next).next).toEqual(next);
  expect(new ListItem(0).next).toBeNull();
});

test('before', () => {
  const item = new ListItem(10);

  expect(item.before(0)).toStrictEqual(new ListItem(0, item));
});

test('after', () => {
  const next = new ListItem(10);
  const item = new ListItem(0, next);

  const result = item.after(5);

  expect(result).toStrictEqual(new ListItem(5, next));
  expect(item).toStrictEqual(new ListItem(0, new ListItem(5, new ListItem(10))));
});

test('iterator', () => {
  const item = new ListItem(0, new ListItem(1, new ListItem(3)));
  const result: number[] = [];

  for (const current of item) {
    result.push(current);
  }

  expect(result).toStrictEqual([ 0, 1, 3 ]);
});