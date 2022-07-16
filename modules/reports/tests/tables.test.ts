import Reports from "../src"

test('format', () => {
  expect(Reports.tables.format<User>(
    [
      { name: 'John', age: 27, comment: '22' },
      { name: 'Tom', age: 42, comment: 'another' },
      { name: 'Dracula', age: 372, comment: '' },
    ],
    {
      columns: [
        { title: 'Name', value: 'name' },
        { title: 'Age', value: 'age' },
        { title: 'Comment', value: ({ comment }) => comment === '' ? '<>' : comment }
      ]
    }
  )).toEqual(trimTable(`
    ╔══════════╦══════╦══════════╗
    ║ Name     ║ Age  ║ Comment  ║
    ╠══════════╬══════╬══════════╣
    ║ John     ║ 27   ║ 22       ║
    ║ Tom      ║ 42   ║ another  ║
    ║ Dracula  ║ 372  ║ <>       ║
    ╚══════════╩══════╩══════════╝
  `))

  expect(Reports.tables.format<User>(
    [
      { name: 'John', age: 27, comment: '22' },
      { name: 'Tom', age: 42, comment: 'another' },
      { name: 'Dracula', age: 372, comment: '' },
    ],
    {
      columns: [
        { title: 'Name', value: 'name' },
        { title: 'Age', value: 'age' },
        { title: 'Comment', value: ({ comment }) => comment === '' ? '<>' : comment }
      ],
      withOutHeaders: true
    }
  )).toEqual(trimTable(`
    ╔══════════╦══════╦══════════╗
    ║ John     ║ 27   ║ 22       ║
    ║ Tom      ║ 42   ║ another  ║
    ║ Dracula  ║ 372  ║ <>       ║
    ╚══════════╩══════╩══════════╝
  `))
});

const trimTable = (str) => str
  .split('\n')
  .map((i) => i.trim())
  .filter((i)=> i.length > 0)
  .join('\n')

export type User = {
  name: string,
  age: number,
  comment: string
};