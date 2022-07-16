import { COLOR_KEYS } from "../colors";
import { ImageSource } from "./source";

export class ImageRow {
  public r: Map<number, number>[] = [];
  public g: Map<number, number>[] = [];
  public b: Map<number, number>[] = [];

  constructor (source: ImageSource, y: number) {
    const { width } = source.size();

    for (const key of COLOR_KEYS) {
      let prev: Map<number, number> = new Map();
      for (let x = 0; x < width; x++) {
        const next = new Map(prev);
        const current = source.get(x, y)[key];
        next.set(current, (next.get(current) || 0) + 1);
        this[key].push(next);  

        prev = next;
      }
    }
  }
}

/*
 1   2   1   
 1-1 1-1 1-2
     2-1 2-1
*/

1-1 - 0 * 1
2-1 - 1 * 1

/*
1 1-2
*/