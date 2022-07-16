import { BLACK, Image, SegmentsImage, WHITE } from '..'
import { ImageSourceArray } from './array'

export abstract class BlackSquare {
  static source (size: number, square: number, black = BLACK, white = WHITE) {
    const start = (size - square) / 2;
    const end = size - (size - square) / 2 - 1;

    return ImageSourceArray.create(
      size, 
      size, 
      (x: number, y: number) => start <= x && x <= end && start <= y && y <= end ? black : white
    )
  }

  static image (size: number, square: number, black = BLACK, white = WHITE) {
    return new Image(BlackSquare.source(size, square, black, white));
  }

  static count (size: number, square: number) {
    return { white: size * size - square * square, black: square * square };
  }
}

export type SegmentsCreateArg = {
  imageSize: number, 
  x: number, 
  y: number, 
  width: number, 
  height: number
};