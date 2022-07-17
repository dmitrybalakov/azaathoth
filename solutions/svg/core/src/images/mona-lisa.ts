import fs from 'fs'
import path from 'path'
import jpeg from 'jpeg-js'
import { Color } from '../colors';
import { Image } from '../image';
import { ImageSourceArray } from './array';

export class MonaLisa {
  static source () {
    const rawImageData = jpeg.decode(fs.readFileSync(path.join(process.cwd(), 'data', 'Mona_Lisa.jpeg')));
    const data: Color[][] = [];

    for (let i = 0; i < rawImageData.data.length; i += 4) {
      if ((i / 4) % rawImageData.width === 0) {
        console.log('new', )
        data.push([]);
      }
      const color = new Color(
        rawImageData.data[i],
        rawImageData.data[i + 1],
        rawImageData.data[i + 2],
        1
      )

      data[data.length - 1].push(color);
    }

    return new ImageSourceArray(data);
  }

  static image () {
    return new Image(MonaLisa.source());
  }
}