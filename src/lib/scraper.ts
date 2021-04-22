import { DEFAULT_SAVE_DIRECTORY, getScrapingUrl } from "../constants";
import requestPromise from "request-promise";
import $ from "cheerio";
import fs from "fs";

function createFile(name: string, items: Array<object>) {
  // directory to check if exists
  const dir = DEFAULT_SAVE_DIRECTORY;

  // check if directory exists
  if (fs.existsSync(dir)) {
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(items));
  } else {
    console.log("Directory not found.");
    console.log("Create 'data' directory");
    fs.mkdirSync(dir);
    createFile(name, items);
  }
}

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
