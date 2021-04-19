import { getScrapingUrl } from "../constants";
import requestPromise from 'request-promise';
import $ from 'cheerio';
import fs from 'fs';
export function extractData(continent: string) {
    const url = getScrapingUrl(continent);
    const flagItems:  Array<object> = [];

    requestPromise(url).then((html: string) => {
        const selectFlags = $(".flag-grid li", html);
        selectFlags.map((_, element) => {
            // nombre, area, populación, continent, url, imagen
            const aELement = $("a", element);
            const area = aELement.attr("data-area");
            const population = aELement.attr("data-population");
            const url = aELement.attr("href");
            const name = $("span", element).text();
            let img = $("img", element).attr("src");
            let imgArray = img?.split("/") || [];
            img = imgArray[imgArray?.length - 1] || '';
            flagItems.push({
                area,
                population,
                url,
                name,
                code: img.replace(".png", ""),
                continent
            });
        });
        fs.writeFileSync(`./${continent}.json`, JSON.stringify(flagItems));
    });
}