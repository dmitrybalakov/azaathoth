import { ListItem } from "./item";

export class List<T> {
  public first: ListItem<T> | null;

  static from <T>(iterable: Iterable<T>): List<T> {
    const result = new List<T>();
    let prev: ListItem<T> | null = null;
    
    for (const item of iterable) {
      const current = new ListItem(item);
      if (prev == null) {
        result.first = prev = current;
        continue;
      }

      prev.next = current;
      prev = current;
    }

    return result;
  }

  constructor (first?: T, next?: ListItem<T>) { 
    this.first = first != null ? new ListItem(first, next) : null;
  }

  items () {
    return {
      [Symbol.iterator]: (function * () {
        let current = this.first;

        while (current != null) {
          yield current;
          current = current.next;
        }
      }).bind(this)
    };
  }

  * [Symbol.iterator](): Generator<T, void, void> {
    let current = this.first;

    while (current != null) {
      yield current.value;
      current = current.next;
    }
  }
}