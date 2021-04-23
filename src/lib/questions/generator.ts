import { IQuestion } from './../../interfaces/question.interface';
import { ICountry } from './../../interfaces/country.interface';
import inquirer from 'inquirer';
import { getCountriesData, selectRandomOthers } from '../functions';
import { selectContinent } from '../options';
import { CONTINENTS, CONTINENT_SELECT_OPTIONS, IMAGES_URL, VERSION } from './../../constants';
import FileManager from '../file-manager';

function selectOption(): Promise<{ OPTION: string }> {
    return inquirer.prompt([
      {
        type: "list",
        name: "OPTION",
        message: "¿Cómo desea extraer las banderas?",
        choices: CONTINENT_SELECT_OPTIONS.map((option: { name: string }) => option.name),
      },
    ]);
  }

export async function createQuestions() {
    const { OPTION } = await selectOption();
    const { key } = CONTINENT_SELECT_OPTIONS.filter(
        (item: { key: string; name: string }) => item.name === OPTION
    )[0];
    let keyValue = key;
    if (keyValue !== 'all') {
        const { CONTINENT } = await selectContinent();
        const {key} = CONTINENTS.filter(
        (item: { key: string; name: string }) => item.name === CONTINENT
        )[0];
        keyValue = key;
    }
    const countries = getCountriesData(keyValue);
    // console.log(countries);
    console.log(countries.length);
    const questions: Array<IQuestion> = [];
    countries.map((value: ICountry, index: number) => {
        const answersIncorrect: Array<string> = [];
        console.log(`${index} => ${value.name}`);
        do {
            answersIncorrect.push(
                countries[
                    selectRandomOthers(countries.length, index)
                ].name
            );
        } while (answersIncorrect.length < 3);
        // Images sizes take from
        // https://flagpedia.net/<country-select>/download/icons
        questions.push({
            default_size: `${IMAGES_URL}256x192/${value.code}.png`,
            mini_size: `${IMAGES_URL}128x96/${value.code}.png`,
            correct: value.name,
            incorrects: answersIncorrect,
            url: value.url
        });
    });
    new FileManager().create(`questions_${keyValue}_${VERSION}`, questions);
}