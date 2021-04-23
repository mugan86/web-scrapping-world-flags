import inquirer from "inquirer";
import { CONTINENTS, PROGRAM_PRINCIPAL_OPTIONS, SCRAPPING_OPTIONS } from "./constants";
import { extractData } from "./lib/scraper";

/**
 * Select option to execute start actions with information
 * @returns OPTION => 'scraping' or 'questions'
 */
export function selectPrincipalOption(): Promise<{ OPTION: string }> {
  return inquirer.prompt([
    {
      type: "list",
      name: "OPTION",
      message: "¿Qué desea realizar?",
      choices: PROGRAM_PRINCIPAL_OPTIONS.map(
        (option: { name: string }) => option.name
      ),
    },
  ]);
}

function selectOption(): Promise<{ OPTION: string }> {
  return inquirer.prompt([
    {
      type: "list",
      name: "OPTION",
      message: "¿Cómo desea extraer las banderas?",
      choices: SCRAPPING_OPTIONS.map((option: { name: string }) => option.name),
    },
  ]);
}

function selectContinent(): Promise<{ CONTINENT: string }> {
  return inquirer.prompt([
    {
      type: "list",
      name: "CONTINENT",
      message: "¿Qué continente seleccionas para extraer sus banderas?",
      choices: CONTINENTS.map((continent: { name: string }) => {
        return continent.name;
      }),
    },
  ]);
}

export async function getScrappingOptions() {
  const { OPTION } = await selectOption();
  const { key } = SCRAPPING_OPTIONS.filter(
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
    const { key } = CONTINENTS.filter(
      (item: { key: string; name: string }) => item.name === CONTINENT
    )[0];

    extractData(key);
  }
}
