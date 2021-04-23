// URL principal
export const MAIN_URL = 'https://flagpedia.net/';

export const PROGRAM_PRINCIPAL_OPTIONS = [
    { key: 'scraping', name: "Extraer información con web scrapping" },
    { key: 'questions', name: "Generar preguntas" },
]

export const SCRAPPING_OPTIONS = [
    { key: 'all', name: "Todas" },
    { key: 'select', name: "Una en particular" },
];

export const DEFAULT_SAVE_DIRECTORY = "./data";

// Información de los diferentes apartados de los continentes
export const CONTINENTS = [
    {key: 'africa',         name: 'África'},
    {key: 'asia',           name: 'Asia'},
    {key: 'europe',         name: 'Europa'},
    {key: 'north-america',  name: 'América del Norte / Centro América'},
    {key: 'oceania',        name: 'Oceania'},
    {key: 'south-america',  name: 'América del Sur'},
];

// Crear URL para la extracción de datos

export function getScrapingUrl(continent: string) {
    return `${MAIN_URL}continent/${continent}`;
}
