import { Person, PersonBirthDescription as BirthDescription } from "./person";

export abstract class Population<T extends Person> {
  constructor (
    public persons: T[],
    public generationSize: number
  ) { }

  abstract empty (): T;
  abstract generate (birth: BirthDescription): T;
  abstract child (a: T, b: T, birth: BirthDescription): T;

  next (generationIndex: number): PopulationNextResult<T> {
    const birth: BirthDescription = { 
      generation: generationIndex, 
      parents: [], 
      type: '<empty>' 
    };

    const generated: T[] = [];
    if (this.isEmpty()) {
      for (let i = 0; i < this.generationSize; i++) {
        generated.push(this.generate({ ...birth, type: 'generated' }));
      }
    } else {
      for (let i = 0; i < this.generationSize; i++) {
        const [ a, b ] = [ this.random(), this.random() ];
        generated.push(this.child(a, b, { ...birth, parents: [ a.id, b.id ], type: 'born' }));
      }
    }
    
    this.persons.push(...generated);
    const deleted = this.clear(generationIndex, this.generationSize);

    return {
      new: generated,
      deleted,
      survived: this.persons.filter(({ birth: { generation } }) => generation === generationIndex)
    }
  }

  isEmpty (): boolean {
    return this.persons.length === 0;
  }

  hero (): T {
    return this.persons[0] || this.empty();
  }

  random (): T {
    return this.persons[Math.floor(this.persons.length * Math.random())] || this.empty();
  }

  sort () {
    this.persons.sort((a, b) => b.result() - a.result());
  }

  clear (generationIndex: number, count: number): T[] {
    this.sort();
    
    const unique = new Map<string, T>();
    const deleted: T[] = [];
    for (const person of this.persons) {
      const hash = person.hash();
      if (unique.has(hash)) {
        deleted.push(person);
        continue;
      }

      unique.set(hash, person);
    }
    
    this.persons = Array.from(unique.values());
    deleted.push(...this.persons.splice(count));
    
    for (const person of deleted) {
      person.deathGeneration = generationIndex;
    }

    return deleted;
  }

  emptyBirthDescription (): BirthDescription {
    return { generation: 0, parents: [], type: 'empty' };
  }
}

export type PopulationNextResult<T> = {
  new: T[], 
  deleted: T[], 
  survived: T[]
};