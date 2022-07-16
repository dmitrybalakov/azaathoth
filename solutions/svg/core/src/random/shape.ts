import { Point, Rect, Size } from "../shape";
import { randomColor } from "./color";

export const randomRect = (size: Size): Rect => {
  const point = randomPoint(size);

  return new Rect(point, randomSize(point, size), randomColor());
}

export const randomPoint = ({ width, height }: Size): Point =>
  new Point(
    Math.floor(width * Math.random()), 
    Math.floor(height * Math.random())
  );

export const randomSize = ({ x, y }: Point, { width, height }: Size): Size => {
  const maxWidth = width - 1 - x;
  const maxHeight = height - 1 - y;

  return new Size(
    Math.floor(maxWidth * Math.random()), 
    Math.floor(maxHeight * Math.random())
  );
}