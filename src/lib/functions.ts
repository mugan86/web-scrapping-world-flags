import { CONTINENTS } from "../constants";
import FileManager from "./file-manager";

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getContinents(continent: string) {
  let flagItems: Array<object> = [];
  if (continent !== "all") {
    flagItems = [...new FileManager().read(`./data/${continent}.json`)];
    console.log(flagItems);
    return;
  }
  console.log("- Extrayendo todos los continentes\n");
  CONTINENTS.forEach((continent: { key: string; name: string }) => {
    console.log(`Extrayendo ${continent.name}...`);
    flagItems = flagItems.concat(
      new FileManager().read(`./data/${continent.key}.json`)
    );
  });
}
