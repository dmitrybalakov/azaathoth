import { BLACK, RED } from "../../colors";
import { MonaLisa, BlackSquare } from "../../images";
import { RsGA } from "./ga";

// const ga = new RsGA(BlackSquare.image(128, 86, RED, BLACK), 128);
const ga = new RsGA(MonaLisa.image(), 256);
while (ga.generationIndex < Infinity) {
  ga.generation();
  
  const hero = ga.population.hero();
  console.log(`# ${ga.generationIndex}: ${hero.result()} [${hero.rects.length}]`);
  console.log(`# ${hero.rects.map((a) => a.shape().segments).flat(2).length}`);
  console.log(hero.svg());

  if (hero.result() > -1) {
    console.log('Fin')
    break;
  }
}