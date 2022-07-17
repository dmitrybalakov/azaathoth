import { Population, PersonBirthDescription } from '@azaathoth/ga'
import { TRANSPERENT } from '../../colors';
import { Image } from '../../image';
import { randomRect } from '../../random/shape';
import { Point, Rect, Size } from '../../shape';
import { childRect } from '../common';
import { RsConfig } from './config';
import { RsPerson } from './person';

export class RsPopulation extends Population<RsPerson> {
  public config: RsConfig;

  constructor (target: Image, generationSize: number) {
    super([], generationSize);
    this.config = new RsConfig(target, generationSize);
  }

  empty(): RsPerson {
    return new RsPerson(this.emptyBirthDescription(), this.config, []);
  }

  generate(birth: PersonBirthDescription): RsPerson {
    return new RsPerson(birth, this.config, [ randomRect(this.config.size) ]);
  }

  child(a: RsPerson, b: RsPerson, birth: PersonBirthDescription): RsPerson {
    const rects: Rect[] = [];
    const length = Math.max(a.rects.length, b.rects.length);
    
    const mutateIndex = Math.floor(Math.min(a.rects.length, b.rects.length) * Math.random());
    for (let i = 0; i < length; i++) {
      const ab = { a: a.rects[i] || b.rects[i], b: b.rects[i] || a.rects[i] };

      if (Math.random() < this.config.deleteProbability) {
        rects.push(new Rect(new Point(0, 0), new Size(0, 0), TRANSPERENT));
        continue;
      }

      if (i === mutateIndex || 1) {
        rects.push(childRect(this.config, ab.a, ab.b));
        continue;
      }

      rects.push(childRect(this.config, ab.a, ab.a));
    }

    if (rects.length < 2 && Math.random() < this.config.addProbability) {
      rects.push(randomRect(this.config.size));
    }

    return new RsPerson(birth, this.config, rects);
  }
}