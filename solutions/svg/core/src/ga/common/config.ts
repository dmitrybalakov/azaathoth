import { Image } from '../../image'
import { Size } from '../../shape';

export class GAConfig {
  public target: Image
  public size: Size;
  public generationSize: number;

  public mutateProbability = 0.05;
  
  public shakeProbability = 0.1;
  public shakeDelta = 2;

  constructor (target: Image, generationSize: number) {
    this.target = target;
    this.size = target.source.size();
    this.generationSize = generationSize;
  }
}