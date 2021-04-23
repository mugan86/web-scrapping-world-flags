import { DEFAULT_SAVE_DIRECTORY } from "../constants";
import * as fs from "fs";

class FileManager {
  /**
   * Function to create individual continent flags info file.
   * Check if 'data' directory exist and if not exist, create
   * first and after save info.
   * @param name File name that create with JSON extension
   * @param items Flags items info in array to save in file
   */
  create(name: string, items: Array<object>) {
    const dir = DEFAULT_SAVE_DIRECTORY;

    if (fs.existsSync(dir)) {
      fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(items));
    } else {
      console.log("Directory not found.");
      console.log("Create 'data' directory");
      fs.mkdirSync(dir);
      this.create(name, items);
    }
  }
  /**
   * Function to load data from select path
   * @param path File name that create with JSON extension
   */
  read(path: string): Array<object> {
    try {
      const data = fs.readFileSync(path, "utf8");
      return JSON.parse(data);
    } catch(e) {
      console.error('Error'.concat(`=> ${e.toString()}`));
      return [];
    }
  }
}

export default FileManager;
