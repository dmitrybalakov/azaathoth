import { Person, PersonBirthDescription } from '@azaathoth/ga'
import { Rect } from '../../shape';
import { personResult } from '../common';
import { RsConfig } from './config'

export class RsPerson extends Person {
  private _result: number | null = null;

  constructor (
    public birth: PersonBirthDescription,
    public config: RsConfig,
    public rects: Rect[]
  ) {
    super(birth);
  }

  hash(): string {
    return this.rects.map(r => r.hash()).join('#');
  }

  result(): number {
    if (this._result == null) {
      this._result = personResult(this.config, this.rects);
    }

    return this._result!;
  }

  svg () {
    const { width, height } = this.config.size;
    const rects = this.rects.map(({ point: { x, y }, size: { width, height }, color }) => 
      `  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color.rgba()}" />`
    ).join('\n');

    return `<svg viewBox="0 0 ${width} ${height}">\n${rects}\n</svg>`
  }
}