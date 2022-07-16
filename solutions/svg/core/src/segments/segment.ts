import { Color } from '../colors'

export class Segment {
  constructor (
    public from: number,
    public to: number,
    public color: Color
  ) { }
}