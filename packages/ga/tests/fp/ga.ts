import { GA } from '../../src'
import { FPPerson } from './person';
import { FPPopulation } from './population';

export class FPGA extends GA<FPPerson> {
  constructor (target: number[], generationSize: number) {
    super(new FPPopulation(target, generationSize));
  }
}