import { Color } from '../colors'
import { Size } from '../shape'

export interface ImageSource {
  size(): Size;
  get(x: number, y: number): Color;
}