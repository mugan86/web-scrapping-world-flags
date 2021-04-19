import { CONTINENTS, getScrapingUrl } from './constants';
import inquirer from 'inquirer';
import { extractData } from './lib/scraper';

// Titulo
function title() {
    console.log("================================================");
    console.log("EXTRACTOR DE BANDERAS MUNDIALES CON WEB SCRAPING");
    console.log("================================================");
}

function selectContinent() {
    return inquirer.prompt([
        {
            type: "list",
            name: "CONTINENT",
            message: "¿Qué continente seleccionas para extraer sus banderas?",
            choices: CONTINENTS.map((continent: {name: string}) => {
                return continent.name
            })
        }
    ]);
}

async function start() {
    title();

    const answers = selectContinent();
    const { CONTINENT } = await answers;
    console.log(CONTINENT);
    const continentValue = CONTINENTS.filter(
        (continent) => continent.name === CONTINENT
    )[0].key
    extractData(continentValue);
}

start();