import { SegmentsImage } from '../../segments'
import { WithShape } from '../../shape';
import { GAConfig } from './config'

export const personResult = (config: GAConfig, shapes: WithShape[]): number => {
  const image = new SegmentsImage(config.size.width, config.size.height);
  for (const shape of shapes) {
    shape.shape().draw(image);
  }

  return -1 * image.delta(config.target);
}