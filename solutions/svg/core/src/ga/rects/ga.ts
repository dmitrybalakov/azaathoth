import { GA } from '@azaathoth/ga'
import { Image } from '../../image'
import { RsPerson } from './person';
import { RsPopulation } from './population';

export class RsGA extends GA<RsPerson> {
  constructor (target: Image, generationSize: number) {
    super(new RsPopulation(target, generationSize));
  }
}