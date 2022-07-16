import { BLACK, Image, SegmentsImage, WHITE } from '../../../../src'
import { ImageSourceArray } from './array'

export abstract class BlackSquare {
  static source (size: number, square: number) {
    const start = (size - square) / 2;
    const end = size - (size - square) / 2 - 1;

    return ImageSourceArray.create(
      size, 
      size, 
      (x: number, y: number) => start <= x && x <= end && start <= y && y <= end ? BLACK : WHITE
    )
  }

  static image (size: number, square: number) {
    return new Image(BlackSquare.source(size, square));
  }

  static count (size: number, square: number) {
    return { white: size * size - square * square, black: square * square };
  }

  segments ({ imageSize, x, y, width, height }: SegmentsCreateArg) {
    const segments = new SegmentsImage(width, height, WHITE);
    segments.rows[0].segments.add
  }
}

export type SegmentsCreateArg = {
  imageSize: number, 
  x: number, 
  y: number, 
  width: number, 
  height: number
};