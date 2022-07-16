import { COLOR_KEYS, randomRect, Size } from "../../src"

test('randomRect', () => {
  for (let i = 0; i < 1000; i++) {
    const shape = randomRect(new Size(16, 16));
    
    for (const key of COLOR_KEYS) {
      expect(shape.color[key]).toBeGreaterThanOrEqual(0);
      expect(color[key]).toBeLessThanOrEqual(255);
    }

    expect(color.a).toBeGreaterThanOrEqual(0);
    expect(color.a).toBeLessThanOrEqual(1);
  }
})