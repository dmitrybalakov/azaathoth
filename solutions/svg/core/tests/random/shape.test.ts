import { COLOR_KEYS, randomRect, Size } from "../../src"

test('randomRect', () => {
  for (let i = 0; i < 1000; i++) {
    const shape = randomRect(new Size(16, 16));

    expect(shape.point.x).toBeGreaterThanOrEqual(0);
    expect(shape.point.x).toBeLessThanOrEqual(15);
    expect(shape.point.y).toBeGreaterThanOrEqual(0);
    expect(shape.point.y).toBeLessThanOrEqual(15);

    expect(shape.size.width).toBeGreaterThanOrEqual(0);
    expect(shape.size.height).toBeGreaterThanOrEqual(0);
    expect(shape.point.x + shape.size.width).toBeLessThanOrEqual(15);
    expect(shape.point.y + shape.size.height).toBeLessThanOrEqual(15);
    
    for (const key of COLOR_KEYS) {
      expect(shape.color[key]).toBeGreaterThanOrEqual(0);
      expect(shape.color[key]).toBeLessThanOrEqual(255);
    }

    expect(shape.color.a).toBeGreaterThanOrEqual(0);
    expect(shape.color.a).toBeLessThanOrEqual(1);
  }
})