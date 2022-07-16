import { Color, ImageSource, Size } from '../../../../src'

export class ImageSourceArray implements ImageSource {
  static create (
    width: number, 
    height: number, 
    initializer: (x: number, y: number) => Color
  ): ImageSourceArray {
    const source: Color[][] = [];
    for (let y = 0; y < height; y++) {
      const row: Color[] = [];
      for (let x = 0; x < width; x++) {
        row.push(initializer(x, y));
      }

      source.push(row);
    }

    return new ImageSourceArray(source);
  }

  constructor (
    public source: Color[][]
  ) { }

  size(): Size {
    if (this.source.length === 0) {
      return { width: 0, height: 0 };
    }

    return { width: this.source[0].length, height: this.source.length };
  }

  get(x: number, y: number): Color {
    return this.source[y][x];
  }
}