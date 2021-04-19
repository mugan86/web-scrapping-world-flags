// URL principal
export const MAIN_URL = 'https://flagpedia.net/';

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