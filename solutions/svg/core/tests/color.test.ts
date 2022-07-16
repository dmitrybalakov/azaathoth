import { BLUE, Color, RED } from "../src/";

test('isEqual', () => {
  expect(new Color(10, 10, 10, 0.5).isEqual(new Color(5, 5, 5, 1))).toBeTruthy();
  expect(new Color(10, 10, 10, 0.5).isEqual(new Color(5, 5, 6, 1))).toBeFalsy();
});

test('delta', () => {
  expect(RED.alpha(0.5).delta(BLUE.alpha(0.5))).toEqual(255);
  expect(RED.alpha(0.5).delta(new Color(255, 1, 2, 0.5))).toEqual(1.5);
});