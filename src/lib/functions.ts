import { CONTINENTS } from "../constants";
import { ICountry } from "../interfaces/country.interface";
import FileManager from "./file-manager";

function getRandom(dataLength: number) {
  return Math.floor(Math.random()* dataLength);
}

export function selectRandomOthers(
    dataLength: number,
    excludePosition: number): number {
    var randNumber = getRandom(dataLength);
    if( randNumber === excludePosition){
        return selectRandomOthers(dataLength,excludePosition);
    }
    return randNumber;
}

export function getCountriesData(continent: string): Array<ICountry> {
  let flagItems: Array<ICountry> = [];
  if (continent !== "all") {
    flagItems = [...new FileManager().read(`./data/${continent}.json`)];
    return flagItems;
  } 
  console.log("- Cargando todos los continentes\n");
  CONTINENTS.forEach((continent: { key: string; name: string }) => {
    console.log(`Cargando ${continent.name}...`);
    flagItems = flagItems.concat(
      new FileManager().read(`./data/${continent.key}.json`)
    );
  });
  return flagItems
}


