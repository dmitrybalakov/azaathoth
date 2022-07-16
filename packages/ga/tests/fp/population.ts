import { Population, PersonBirthDescription } from '../../src'
import { FPPerson } from './person';

export class FPPopulation extends Population<FPPerson> {
  public probabilities = { out: 0.5 };
  public shake = 0.2;

  constructor (
    public target: number[],
    generationSize: number
  ) {
    super([], generationSize);
  }

  empty(): FPPerson {
    return new FPPerson(
      this.emptyBirthDescription(), 
      new Array(this.target.length).fill(0),
      this.target
    );
  }

  generate(birth: PersonBirthDescription): FPPerson {
    return new FPPerson(
      birth, 
      this.target.map(() => Math.random()),
      this.target
    );
  }

  child(a: FPPerson, b: FPPerson, birth: PersonBirthDescription): FPPerson {
    const coords: number[] = [];
    const k = Math.random() < this.probabilities.out ? Math.random() : 1 / Math.random();
    
    for (let i = 0; i < a.coords.length; i++) {
      const d = b.coords[i] - a.coords[i];
      coords.push(a.coords[i] + d * (k + this.shake * Math.random()))
    }

    return new FPPerson(birth, coords, this.target);
  }
}