import { getScrapingUrl } from "./../../constants";
import requestPromise from "request-promise";
import $ from "cheerio";
import FileManager from "../file-manager";

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
    new FileManager().create(continent, flagItems);
  });
}
