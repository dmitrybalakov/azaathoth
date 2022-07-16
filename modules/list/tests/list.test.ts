import { List, ListItem } from '../src'

test('Constructor', () => {
  const item = new ListItem(10);

  expect(new List().first).toBeNull();
  expect(new List(10).first).toEqual(new ListItem(10));
  expect(new List(10, item).first).toEqual(new ListItem(10, item));
});

test.only('from', () => {
  expect(List.from([])).toStrictEqual(new List());
  expect(List.from([ 0, 1, 2, 3]))
    .toStrictEqual(new List(0, new ListItem(1, new ListItem(2, new ListItem(3)))));
});

test('iterator ', () => {
  const empty: number[] = [];
  const items: number[] = [];

  for (const a of new List<number>()) {
    empty.push(a)
  }

  for (const a of List.from([ 0, 1, 3])) {
    items.push(a)
  }

  expect(empty).toStrictEqual([]);
  expect(items).toStrictEqual([ 0, 1, 3 ]);
})