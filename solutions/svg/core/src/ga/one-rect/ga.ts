import { GA } from '@azaathoth/ga'
import { Image } from '../../image'
import { ORPerson } from './person';
import { ORPopulation } from './population';

export class ORGA extends GA<ORPerson> {
  constructor (target: Image, generationSize: number) {
    super(new ORPopulation(target, generationSize));
  }
}