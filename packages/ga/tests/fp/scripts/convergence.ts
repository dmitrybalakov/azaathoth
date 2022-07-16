import Reports from '@azaathoth/reports'
import { FPGA } from '..'

const NUMBER_OF_EXPERIMENTS = 100;
const MIN_DIMENSION = 1;
const MAX_DIMENSION = 10;
const ACCURACY = 0.99;
const GENERATION_SIZE = 128;

const calc = (dimension: number) => {
  const start = Date.now();
  const generations: number[] = [];

  while (generations.length < NUMBER_OF_EXPERIMENTS) {
    const fp = new FPGA(new Array(dimension).fill(0).map(() => 1 / Math.random()), GENERATION_SIZE);
    while (fp.population.hero().result() <= ACCURACY) {
      fp.generation();
    }

    generations.push(fp.generationIndex);
  }

  const result = { dimension, min: Infinity, average: 0, max: -Infinity, count: 0, time: Date.now() - start };
  for (const gi of generations) {
    result.min = Math.min(result.min, gi);
    result.max = Math.max(result.max, gi);
    result.average += gi;
    result.count += 1;
  }

  result.average /= result.count;

  return result;
}

const report = () => Reports.tables.format(
  new Array(MAX_DIMENSION - MIN_DIMENSION + 1)
    .fill(0)
    .map((_, i) => calc(MIN_DIMENSION + i)),
  {
    columns: [
      { title: 'Dimension', value: 'dimension' },
      { title: 'Experiments', value: 'count' },
      { title: 'Accuracy', value: () => ACCURACY },
      { title: 'Generation Size', value: () => GENERATION_SIZE },
      { title: 'Result', value: ({ min, max }) => `${min}..${max}` },
      { title: 'Time', value: ({ time }) => (time / 1000).toFixed(2) },
      { title: 'Avg', value: 'average' }
    ]
  }
)

console.log(report())