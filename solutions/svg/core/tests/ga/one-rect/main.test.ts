import { TRANSPERENT, BlackSquare, ORGA, randomColor } from '../../../src'

test('main', () => {
  const ga = new ORGA(BlackSquare.image(24, 12, randomColor().alpha(1), TRANSPERENT), 128);
  while (ga.generationIndex < 128) {
    ga.generation();
    
    if (ga.population.hero().result() > -100) {
      break;
    }
  }

  expect(ga.population.hero().result()).toBeGreaterThan(-100);
})