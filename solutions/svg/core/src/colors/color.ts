export class Color {
  constructor (
    public r: number,
    public g: number,
    public b: number,
    public a: number,
  ) { }

  isTranperent () {
    return this.a === 0;
  }

  isEqual (color: Color) {
    return Math.floor(this.r * this.a) === Math.floor(color.r * color.a)
      && Math.floor(this.g * this.a) === Math.floor(color.g * color.a)
      && Math.floor(this.b * this.a) === Math.floor(color.b * color.a);
  }

  background (bg: Color): Color {
    return new Color(
      this.r * this.a + bg.r * bg.a * (1 - this.a),
      this.g * this.a + bg.g * bg.a * (1 - this.a),
      this.b * this.a + bg.b * bg.a * (1 - this.a),
      1
    )
  }

  delta (color: Color) {
    return Math.abs(color.r * color.a - this.r * this.a)
      + Math.abs(color.g * color.a - this.g * this.a)
      + Math.abs(color.b * color.a - this.b * this.a);
  }

  red (r: number): Color {
    return new Color(r, this.g, this.b, this.a);
  }

  green (g: number): Color {
    return new Color(this.r, g, this.b, this.a);
  }

  blue (b: number): Color {
    return new Color(this.r, this.g, b, this.a);
  }

  alpha (a: number): Color {
    return new Color(this.r, this.g, this.b, a);
  }
}

export const COLOR_KEYS: ColorKey[] = [ 'r', 'g', 'b' ];

export type ColorKey = 'r' | 'g' | 'b';