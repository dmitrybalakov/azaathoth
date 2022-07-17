import { Color } from "../../colors";
import { Segment, SegmentsImage } from "../../segments";

export interface WithShape {
  hash(): string;
  shape(): Shape;
}

export class Shape {
  constructor (
    public segments: ShapeSegment[]
  ) { }

  draw (image: SegmentsImage) {
    for (const { y, segment } of this.segments) {
      image.rows[y].segments.add(segment);
    }
  }
}

export class ShapeSegment {
  public y: number;
  public segment: Segment;

  constructor (y: number, from: number, to: number, color: Color  ) { 
    this.y = y;
    this.segment = new Segment(from, to, color);
  }

  draw (image: SegmentsImage) {
    image.rows[this.y].segments.add(this.segment);
  }
}