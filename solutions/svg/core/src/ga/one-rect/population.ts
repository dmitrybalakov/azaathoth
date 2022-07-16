import { Population, PersonBirthDescription } from '@azaathoth/ga'
import { Color, TRANSPERENT } from '../../colors';
import { Image } from '../../image';
import { randomRect } from '../../random/shape';
import { Point, Rect, Size } from '../../shape';
import { ORConfig } from './config';
import { ORPerson } from './person';

export class ORPopulation extends Population<ORPerson> {
  public config: ORConfig;

  constructor (target: Image, generationSize: number) {
    super([], generationSize);
    this.config = new ORConfig(target, generationSize);
  }

  empty(): ORPerson {
    return new ORPerson(
      this.emptyBirthDescription(), 
      this.config,
      new Rect(new Point(0, 0), new Size(0, 0), TRANSPERENT)
    );
  }

  generate(birth: PersonBirthDescription): ORPerson {
    return new ORPerson(birth, this.config, randomRect(this.config.size));
  }

  child(a: ORPerson, b: ORPerson, birth: PersonBirthDescription): ORPerson {
    const k = Math.random() < 0.5 ? Math.random() : 1 + Math.random();

    return new ORPerson(
      birth, 
      this.config, 
      this.normalize(new Rect(
        new Point(
          this.vec(k, a.rect.point.x, b.rect.point.x, this.config.size.width - 1), 
          this.vec(k, a.rect.point.y, b.rect.point.y, this.config.size.height - 1)
        ),
        new Size(
          this.vec(k, a.rect.size.width, b.rect.size.width, this.config.size.width - 1), 
          this.vec(k, a.rect.size.height, b.rect.size.height, this.config.size.height - 1), 
        ),
        new Color(
          this.vec(k, a.rect.color.r, b.rect.color.r, 255), 
          this.vec(k, a.rect.color.g, b.rect.color.g, 255), 
          this.vec(k, a.rect.color.b, b.rect.color.b, 255), 
          this.vec(k, a.rect.color.a, b.rect.color.a, 1), 
        ),
      ))
    );
  }

  vec (k: number, a: number, b: number, max: number): number {
    if (Math.random() < this.config.mutateProbability) {
      return Math.random() * max;
    }

    const delta = b - a;
    const shake = Math.random() < this.config.shakeProbability 
      ? this.config.shakeDelta * (Math.random() < 0.5 ?  1 : -1) * Math.random()
      : 0;
    return a + delta * k + shake;
  }

  normalize (rect: Rect): Rect {
    // point
    rect.point.x = Math.floor(rect.point.x);
    rect.point.y = Math.floor(rect.point.y);
    if (rect.point.x < 0) {
      rect.point.x = 0;
    }

    if (rect.point.x > this.config.size.width - 1) {
      rect.point.x = this.config.size.width - 1;
    }

    if (rect.point.y < 0) {
      rect.point.y = 0;
    }

    if (rect.point.y > this.config.size.height - 1) {
      rect.point.y = this.config.size.height - 1;
    }

    // size
    const maxWidth = this.config.size.width - rect.point.x - 1;
    const maxHeight = this.config.size.height - rect.point.y - 1;

    rect.size.width = Math.floor(Math.max(1, Math.min(maxWidth, rect.size.width)));
    rect.size.height = Math.floor(Math.max(1, Math.min(maxHeight, rect.size.height)));
    
    rect.color.a = Math.max(0, Math.min(1, rect.color.a));
    rect.color.r = Math.floor(Math.max(0, Math.min(255, rect.color.r)));
    rect.color.g = Math.floor(Math.max(0, Math.min(255, rect.color.g)));
    rect.color.b = Math.floor(Math.max(0, Math.min(255, rect.color.b)));

    return rect;
  }
}