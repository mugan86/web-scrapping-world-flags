import { DEFAULT_SAVE_DIRECTORY, getScrapingUrl } from "../../constants";
import requestPromise from "request-promise";
import $ from "cheerio";
import fs from "fs";

/**
 * Function to create individual continent flags info file.
 * Check if 'data' directory exist and if not exist, create
 * first and after save info.
 * @param name File name that create with JSON extension
 * @param items Flags items info in array to save in file
 */
function createFile(name: string, items: Array<object>) {
  
  const dir = DEFAULT_SAVE_DIRECTORY;

  if (fs.existsSync(dir)) {
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(items));
  } else {
    console.log("Directory not found.");
    console.log("Create 'data' directory");
    fs.mkdirSync(dir);
    createFile(name, items);
  }
}

/**
 * Select continent all flags list page to extract info+
 * and save in JSON file
 * @param continent select continent key code
 */
export function extractData(continent: string) {
  const url = getScrapingUrl(continent);
  const flagItems: Array<object> = [];

  requestPromise(url).then((html: string) => {
    const selectFlags = $(".flag-grid li", html);
    selectFlags.map((_, element) => {
      const aELement = $("a", element);
      const area = aELement.attr("data-area");
      const population = aELement.attr("data-population");
      const url = aELement.attr("href");
      const name = $("span", element).text();
      let img = $("img", element).attr("src");
      let imgArray = img?.split("/") || [];
      img = imgArray[imgArray?.length - 1] || "";
      flagItems.push({
        area: +(area || 0),
        population: +(population || 0),
        url,
        name,
        code: img.replace(".png", ""),
        continent,
      });
    });
    createFile(continent, flagItems);
  });
}
