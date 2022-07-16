import { Person } from "./person";
import { Population } from "./population";

export class GA<T extends Person> {
  public generationIndex = 0;

  constructor (
    public population: Population<T>
  ) { }

  generation () {
    this.population.next(this.generationIndex);

    this.generationIndex++;
  }
}