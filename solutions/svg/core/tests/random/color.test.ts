import { COLOR_KEYS, randomColor } from "../../src"

test('randomColor', () => {
  for (let i = 0; i < 1000; i++) {
    const color = randomColor();
    
    for (const key of COLOR_KEYS) {
      expect(color[key]).toBeGreaterThanOrEqual(0);
      expect(color[key]).toBeLessThanOrEqual(255);
    }

    expect(color.a).toBeGreaterThanOrEqual(0);
    expect(color.a).toBeLessThanOrEqual(1);
  }
})