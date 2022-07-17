import { Population, PersonBirthDescription } from '@azaathoth/ga'
import { TRANSPERENT } from '../../colors';
import { Image } from '../../image';
import { randomRect } from '../../random/shape';
import { Point, Rect, Size } from '../../shape';
import { childRect } from '../common';
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
    return new ORPerson(
      birth, 
      this.config, 
      childRect(this.config, a.rect, b.rect)
    );
  }
}