export abstract class Interval<T> {
  public min: number = 0;
  public max: number = 0;
  public sum: number = 0;
  public count: number = 0;

  abstract value(item: T): number;
  
  process (item: T) {
    const value = this.value(item);

    this.min = value < this.min || this.count === 0 ? value : this.min;
    this.max = value > this.min || this.count === 0 ? value : this.max;
    this.sum += value;
    this.count += 1;
  }

  json (): IntervalValue {
    return this.count === 0 
      ? { min: 0, middle: 0, max: 0, count: 0 } 
      : { 
        min: this.min, 
        middle: this.sum /this.count, 
        max: this.max,
        count: this.count
      };
  }

  toFixed (fractionDigits: number ): string {
    const { min, middle, max } = this.json();

    return `${min.toFixed(fractionDigits)}..${middle.toFixed(fractionDigits)}..${max.toFixed(fractionDigits)}`;
  }
}

export type IntervalValue = {
  min: number;
  middle: number;
  max: number;
  count: number;
};