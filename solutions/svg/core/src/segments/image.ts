import { Color, COLOR_KEYS, TRANSPERENT } from "../colors";
import { Image } from "../image";
import { Segments } from "./segments";

export class SegmentsImage {
  public rows: SegmentsImageRow[];

  constructor (
    public width: number,
    public height: number,
    public background: Color = TRANSPERENT,
  ) { 
    this.rows = new Array(height)
      .fill(0)
      .map((_, y) => new SegmentsImageRow(y, width, background));
  }

  delta (target: Image): number {
    let result = 0;
    for (const { y, segments } of this.rows) {
      for (const segment of segments) {
        // from
        for (const key of COLOR_KEYS) {
          const targetColor = segment.color[key];
          const points = target.rows[y][key][segment.from - 1] || new Map<number, number>();
          for (const [ colorValue, count ] of points) {
            result -= Math.abs(targetColor - colorValue) * count;
          }
        }

        // to
        for (const key of COLOR_KEYS) {
          const targetColor = segment.color[key];
          const points = target.rows[y][key][segment.to];
          for (const [ colorValue, count ] of points) {
            result += Math.abs(targetColor - colorValue) * count;
          }
        }
      }
    }

    return result;
  }
}

export class SegmentsImageRow {
  public y: number;
  public segments: Segments;

  constructor (y: number, width: number, color: Color = TRANSPERENT) {
    this.y = y;
    this.segments = new Segments(width, color);
  } 
}