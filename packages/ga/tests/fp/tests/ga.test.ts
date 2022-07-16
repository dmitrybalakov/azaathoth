import { FPGA } from '..'

test("1d [0;1]", () => {
  const fp = new FPGA([ Math.random() ], GENERATION_SIZE);

  while (fp.population.hero().result() <= ACCURACY && fp.generationIndex < GENERATIONS_COUNT_1D) {
    fp.generation();
  }

  expect(fp.population.hero().result()).toBeGreaterThan(ACCURACY);
});

test("1d [-5;-5]", () => {
  const fp = new FPGA([ 5 - Math.random() * 10 ], GENERATION_SIZE);
  while (fp.population.hero().result() <= ACCURACY && fp.generationIndex < GENERATIONS_COUNT_1D) {
    fp.generation();
  }

  expect(fp.population.hero().result()).toBeGreaterThan(ACCURACY);
});

test("1d [any;any]", () => {
  const fp = new FPGA(new Array(1).fill(0).map(random), GENERATION_SIZE);
  while (fp.population.hero().result() <= ACCURACY && fp.generationIndex < GENERATIONS_COUNT_1D) {
    fp.generation();
  }

  expect(fp.population.hero().result()).toBeGreaterThan(ACCURACY);
});

test("2d [any;any]", () => {
  const fp = new FPGA(new Array(2).fill(0).map(random), GENERATION_SIZE);
  while (fp.population.hero().result() <= ACCURACY && fp.generationIndex < GENERATIONS_COUNT_2D) {
    fp.generation();
  }

  expect(fp.population.hero().result()).toBeGreaterThan(ACCURACY);
});

test("5d [any;any;...]", () => {
  const fp = new FPGA(new Array(5).fill(0).map(random), GENERATION_SIZE);
  while (fp.population.hero().result() <= ACCURACY && fp.generationIndex < GENERATIONS_COUNT_5D) {
    fp.generation();
  }

  expect(fp.population.hero().result()).toBeGreaterThan(ACCURACY);
});

const random = () => {
  return 1 / Math.random()
}

const GENERATION_SIZE = 64;
const GENERATIONS_COUNT_1D = 64;
const GENERATIONS_COUNT_2D = 128;
const GENERATIONS_COUNT_5D = 1024;
const ACCURACY = 0.999999;