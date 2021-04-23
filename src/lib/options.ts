import inquirer from "inquirer";
import { PROGRAM_PRINCIPAL_OPTIONS } from "../constants";

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