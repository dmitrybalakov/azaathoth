import { Person, PersonBirthDescription } from '../../src'

export class FPPerson extends Person {
  constructor (
    public birth: PersonBirthDescription,
    public coords: number[],
    public target: number[],
  ) {
    super(birth);
  }

  hash(): string {
    return this.coords.join(';');
  }

  result(): number {
    let result = 0;
    for (let i = 0; i < this.target.length; i++) {
      result += (this.target[i] - this.coords[i]) ** 2;
    }

    return 1 - Math.sqrt(result);
  }
}