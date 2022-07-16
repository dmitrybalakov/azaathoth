export abstract class Person {
  public static NEXT_ID = 0;

  public id: number = Person.NEXT_ID++;
  public deathGeneration: number | number;

  constructor (
    public birth: PersonBirthDescription
  ) { }

  abstract hash (): string;
  abstract result (): number;
}

export type PersonBirthDescription = {
  generation: number,
  parents: number[],
  type: string
};