import { ImageSource } from './source'
import { ImageRow } from './row'

export class Image {
  public rows: ImageRow[] = [];

  constructor (
    public source: ImageSource
  ) { 
    const { height } = source.size();
    for (let y = 0; y < height; y++) {
      this.rows.push(new ImageRow(source, y));
    }
  }
}