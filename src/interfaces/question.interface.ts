import { ICountry } from "./country.interface";

export interface IQuestion {
    default_size: string;
    mini_size: string;
    correct: string;
    incorrects: Array<string>;
    url: string;
}