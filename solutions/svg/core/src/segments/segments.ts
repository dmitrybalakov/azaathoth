import { List, ListItem } from '../../../../../modules/list/target'
import { Color, TRANSPERENT } from '../colors'
import { Segment } from './segment';

export class Segments extends List<Segment> {
  constructor (width: number, background: Color = TRANSPERENT) {
    super(new Segment(0, width - 1, background));
  }

  add (segment: Segment) {
    const newList = List.from([ new Segment(-1, -1, TRANSPERENT) ]);
    let last = newList.first!;

    for (const current of this) {
      if (current.from > segment.to) {
        last = last.after(current);
        break;
      }
      
      if (current.to < segment.from) {
        last = last.after(current);
        continue;
      }

      if (segment.from > current.from) {
        last = last.after(new Segment(current.from, segment.from - 1, current.color));
      }

      last = last.after(new Segment(
        Math.max(segment.from, current.from), 
        Math.min(segment.to, current.to), 
        segment.color.background(current.color)
      ));

      if (segment.to < current.to) {
        last = last.after(new Segment(segment.to + 1, current.to, current.color));
      }
    }

    this.first = newList.first!.next;
    this.defragment();
  }

  defragment () {
    let prev: ListItem<Segment> | null = null;
    let current = this.first;
    while (current != null) {
      if (prev == null) {
        prev = current;
        continue;
      }
      if (prev.value.color.isEqual(current.value.color)) {
        prev.value.to = current.value.to;
        prev.next = current.next;
      }

      prev = current;
      current = current.next;
    }
  }
}