import inquirer from "inquirer";
import { extractData } from "./index";
import { CONTINENTS, CONTINENT_OPTIONS } from "./../../constants";
import { selectContinent } from "../options";

function selectOption(): Promise<{ OPTION: string }> {
  return inquirer.prompt([
    {
      type: "list",
      name: "OPTION",
      message: "¿Cómo desea extraer las banderas?",
      choices: CONTINENT_OPTIONS.map((option: { name: string }) => option.name),
    },
  ]);
}

export async function getScrappingOptions() {
  const { OPTION } = await selectOption();
  const { key } = CONTINENT_OPTIONS.filter(
    (item: { key: string; name: string }) => item.name === OPTION
  )[0];
  if (key === "all") {
    console.log("- Extrayendo todos los continentes\n");
    CONTINENTS.forEach((continent: { key: string; name: string }) => {
      console.log(`Extrayendo ${continent.name}...`);
      extractData(continent.key);
      console.log(`${continent.name} extraído correctamente.\n\n`);
    });
  } else {
    const { CONTINENT } = await selectContinent();
    const key = CONTINENTS.filter(
      (item: { key: string; name: string }) => item.name === CONTINENT
    )[0]['key'];

    extractData(key);
  }
}
