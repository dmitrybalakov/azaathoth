import { BLACK, RED, SegmentsImage, SegmentsImageRow, TRANSPERENT, WHITE, BlackSquare } from "../../src";

test('constructor', () => {
  const image = new SegmentsImage(128, 64);
  expect(image.rows).toStrictEqual(
    new Array(64).fill(0).map((_, y) => new SegmentsImageRow(y, 128, TRANSPERENT))
  );
});

test('BlackSquare 3 1', () => {
  const image = BlackSquare.image(3, 1);
  const count = BlackSquare.count(3, 1);

  expect(new SegmentsImage(3, 3, TRANSPERENT).delta(image))
    .toEqual(count.white * 255 * 3 + count.black * 0);
  expect(new SegmentsImage(3, 3, BLACK).delta(image))
    .toEqual(count.white * 255 * 3 + count.black * 0);
  expect(new SegmentsImage(3, 3, WHITE).delta(image))
    .toEqual(count.white * 0 + count.black * 3 * 255);
  expect(new SegmentsImage(3, 3, RED).delta(image))
    .toEqual(count.white * 2 * 255 + count.black * 1 * 255);
});


test('BlackSquare 16 12', () => {
  const image = BlackSquare.image(16, 12);
  const count = BlackSquare.count(16, 12);

  expect(new SegmentsImage(16, 16, TRANSPERENT).delta(image))
    .toEqual(count.white * 255 * 3 + count.black * 0);
  expect(new SegmentsImage(16, 16, BLACK).delta(image))
    .toEqual(count.white * 255 * 3 + count.black * 0);
  expect(new SegmentsImage(16, 16, WHITE).delta(image))
    .toEqual(count.white * 0 + count.black * 3 * 255);
  expect(new SegmentsImage(16, 16, RED).delta(image))
    .toEqual(count.white * 2 * 255 + count.black * 1 * 255);
});
