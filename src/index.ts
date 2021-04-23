import {
  PROGRAM_PRINCIPAL_OPTIONS,
} from "./constants";
import { selectPrincipalOption } from "./lib/options";
import { createQuestions } from "./lib/questions/generator";
import { getScrappingOptions } from "./lib/scraper/options";

// Titulo
function title() {
  console.log(
    "====================================================================="
  );
  console.log("EXTRACTOR / GENERADOR PREGUNTAS BANDERAS MUNDIALES");
  console.log(
    "====================================================================="
  );
}

async function start() {
  title();
  // Principal options
  const { OPTION } = await selectPrincipalOption();
  const { key } = PROGRAM_PRINCIPAL_OPTIONS.filter(
    (item: { key: string; name: string }) => item.name === OPTION
  )[0];
  
  if (key === 'scraping') {
    getScrappingOptions();
    return;
  }
  createQuestions();
}

start();
