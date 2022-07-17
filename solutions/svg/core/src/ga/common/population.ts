import { Color } from '../../colors';
import { Point, Rect, Size } from '../../shape';
import { GAConfig } from './config';

export const childRect = (
  config: GAConfig, 
  a: Rect, 
  b: Rect, 
  k = 2 * Math.random()
): Rect => 
  normalizeRect(
    config,
    new Rect(
      new Point(
        childValue(config, k, a.point.x, b.point.x, config.size.width - 1), 
        childValue(config, k, a.point.y, b.point.y, config.size.height - 1)
      ),
      new Size(
        childValue(config, k, a.size.width, b.size.width, config.size.width - 1), 
        childValue(config, k, a.size.height, b.size.height, config.size.height - 1), 
      ),
      new Color(
        childValue(config, k, a.color.r, b.color.r, 255), 
        childValue(config, k, a.color.g, b.color.g, 255), 
        childValue(config, k, a.color.b, b.color.b, 255), 
        childValue(config, k, a.color.a, b.color.a, 1), 
      ),
    )
  )

export const childValue = (
  config: GAConfig, 
  k: number, 
  a: number, 
  b: number, 
  max: number
): number => {
  if (Math.random() < config.mutateProbability) {
    return Math.random() * max;
  }

  const delta = b - a;
  const shake = Math.random() < config.shakeProbability 
    ? config.shakeDelta * (Math.random() < 0.5 ?  1 : -1) * Math.random()
    : 0;
  return a + delta * k + shake;
}

export const normalizeRect = (config: GAConfig, rect: Rect): Rect => {
  // point
  rect.point.x = Math.floor(rect.point.x);
  rect.point.y = Math.floor(rect.point.y);
  if (rect.point.x < 0) {
    rect.point.x = 0;
  }

  if (rect.point.x > config.size.width - 1) {
    rect.point.x = config.size.width - 1;
  }

  if (rect.point.y < 0) {
    rect.point.y = 0;
  }

  if (rect.point.y > config.size.height - 1) {
    rect.point.y = config.size.height - 1;
  }

  // size
  const maxWidth = config.size.width - rect.point.x - 1;
  const maxHeight = config.size.height - rect.point.y - 1;

  rect.size.width = Math.floor(Math.max(1, Math.min(maxWidth, rect.size.width)));
  rect.size.height = Math.floor(Math.max(1, Math.min(maxHeight, rect.size.height)));
  
  rect.color.a = Math.max(0, Math.min(1, rect.color.a));
  rect.color.r = Math.floor(Math.max(0, Math.min(255, rect.color.r)));
  rect.color.g = Math.floor(Math.max(0, Math.min(255, rect.color.g)));
  rect.color.b = Math.floor(Math.max(0, Math.min(255, rect.color.b)));

  return rect;
}