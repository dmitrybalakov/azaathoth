import { Color, ImageRow } from '../../src'
import { ImageSourceArray } from '../modules';

test('constructor', () => {
  expect(
    new ImageRow(
      ImageSourceArray.create(100, 1, (x: number) => new Color(x, 0, 0, 1)),
      0
    ).r
  ).toStrictEqual(
    new Array(100)
      .fill(0)
      .reduce((agg, _, index) => {
        const next = index === 0 ? new Map() : new Map(agg[index - 1]);
        next.set(index, 1);
        agg[index] = next;

        return agg;
      }, [])
  );
  expect(
    new ImageRow(
      ImageSourceArray.create(100, 1, (x: number) => new Color(Math.floor(x / 5), 0, 0, 1)),
      0,
    ).r
  ).toStrictEqual(
    new Array(100)
      .fill(0)
      .reduce((agg, _, index) => {
        const next = index === 0 ? new Map() : new Map(agg[index - 1]);
        const current = Math.floor(index / 5);
        next.set(current, (next.get(current) || 0) + 1);
        agg[index] = next;

        return agg;
      }, [])
  );
});

