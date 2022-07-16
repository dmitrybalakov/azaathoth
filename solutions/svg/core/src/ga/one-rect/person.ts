import { Person, PersonBirthDescription } from '@azaathoth/ga'
import { SegmentsImage } from '../../segments'
import { Rect } from '../../shape';
import { ORConfig } from './config'

export class ORPerson extends Person {
  private _result: number | null = null;

  constructor (
    public birth: PersonBirthDescription,
    public config: ORConfig,
    public rect: Rect
  ) {
    super(birth);
  }

  hash(): string {
    return [
      this.rect.point.x,
      this.rect.point.y,
      this.rect.size.width,
      this.rect.size.height,
      this.rect.color.rgba(),
    ].join('#')
  }

  result(): number {
    if (this._result == null) {
      const image = new SegmentsImage(this.config.size.width, this.config.size.height);
      this.rect.shape().draw(image);

      this._result = -1 * image.delta(this.config.target);
    }

    return this._result!;
  }
}