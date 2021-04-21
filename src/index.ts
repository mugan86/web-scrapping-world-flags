import { CONTINENTS, OPTIONS } from './constants';
import inquirer from 'inquirer';
import { extractData } from './lib/scraper';

// Titulo
function title() {
    console.log("================================================");
    console.log("EXTRACTOR DE BANDERAS MUNDIALES CON WEB SCRAPING");
    console.log("================================================");
}

function selectOption(): Promise<any> {
    return inquirer.prompt([
        {
            type: "list",
            name: "OPTION",
            message: "¿Cómo desea extraer las banderas?",
            choices: OPTIONS.map((option: { name: string }) => option.name),
        },
    ]);
}

function selectContinent(): Promise<any> {
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

    const { OPTION } = await selectOption();
    const { key } = OPTIONS.filter(
        (item: { key: number; name: string }) => item.name === OPTION
    )[0];

    if (key === 0) {
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

start();
