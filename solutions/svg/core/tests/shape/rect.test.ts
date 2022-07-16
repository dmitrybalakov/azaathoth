import { Point, Rect, RED, Shape, ShapeSegment, Size } from "../../src";

test('shape', () => {
  expect(new Rect(new Point(3, 5), new Size(4, 7), RED).shape())
    .toStrictEqual(
      new Shape(
        new Array(7).fill(0).map((_, y) => new ShapeSegment(5 + y, 3, 6, RED))
      )
    )
});