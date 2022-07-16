import { Interval } from '../../src'

test('process', () => {
  const interval = new TestInterval();

  interval.process(0.2);
  
  expect(interval.json()).toStrictEqual({ min: 0.2, middle: 0.2, max: 0.2, count: 1 });
  
  interval.process(0.3);
  interval.process(0.4);
  interval.process(0.5);
  interval.process(0.6);
  interval.process(0.7);

  expect(interval.json()).toStrictEqual({ min: 0.2, middle: 0.45, max: 0.7, count: 6 });
});

test('empty json', () => {
  const interval = new TestInterval();

  expect(interval.json()).toStrictEqual({ min: 0, middle: 0, max: 0, count: 0 });
});

test('toFixed', () => {
  const interval = new TestInterval();
  
  interval.min = 0.1726354;
  interval.max = 1.2726354;
  interval.count = 7;
  interval.sum = 2.828173;

  expect(interval.toFixed(0)).toEqual('0..0..1');
  expect(interval.toFixed(2)).toEqual('0.17..0.40..1.27');
  expect(interval.toFixed(4)).toEqual('0.1726..0.4040..1.2726');
})

class TestInterval extends Interval<number> {
  value(item: number): number { return item }

}