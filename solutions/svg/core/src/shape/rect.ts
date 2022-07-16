import { Color } from '../colors'
import { Point } from './core/point'
import { Size } from './core/size'
import { Shape, ShapeSegment, WithShape } from './core/shape'

export class Rect implements WithShape {
  constructor (
    public point: Point,
    public size: Size,
    public color: Color,
  ) { }

  shape(): Shape {
    const { x, y } = this.point;
    const { width, height } = this.size;

    return new Shape(
      new Array(height)
        .fill(0)
        .map((_, dy) => new ShapeSegment(y + dy, x, x + width - 1, this.color))
    );
  }
}