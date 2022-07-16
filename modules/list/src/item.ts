export class ListItem<T> {
  public value: T;
  public next: ListItem<T> | null;

  constructor (value: T, next: ListItem<T> | null = null) { 
    this.value = value;
    this.next = next || null;
  }

  before (value: T) {
    return new ListItem(value, this);
  }

  after (value: T) {
    return this.next = new ListItem(value, this.next);
  }

  * [Symbol.iterator](): Generator<T, void, void> {
    let current: ListItem<T> | null = this;

    while (current != null) {
      yield current.value;
      current = current.next;
    }
  }
}