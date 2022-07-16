import { Color, Image, ImageRow, ImageSourceArray } from '../../src'

test('constructor', () => {
  const source = ImageSourceArray.create(
    100, 
    20, 
    (x: number, y: number) => new Color(x, Math.floor(y / 5), 0, 1)
  );
  expect(new Image(source).rows).toStrictEqual(
    new Array(20)
      .fill(0)
      .map((_, index) => new ImageRow(source, index))
  );
});

test('32x64', () => {
  const source = ImageSourceArray.create(
    32, 
    64, 
    (x: number, y: number) => new Color(y, x, y + x, 1)
  );
  expect(new Image(source).rows).toStrictEqual(
    new Array(64)
      .fill(0)
      .map((_, index) => new ImageRow(source, index))
  );
});