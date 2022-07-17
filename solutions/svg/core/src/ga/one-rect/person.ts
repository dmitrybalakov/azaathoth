import { Person, PersonBirthDescription } from '@azaathoth/ga'
import { Rect } from '../../shape';
import { personResult } from '../common';
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
    return this.rect.hash();
  }

  result(): number {
    if (this._result == null) {
      this._result = personResult(this.config, [ this.rect ]);
    }

    return this._result!;
  }
}