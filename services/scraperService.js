const cheerio = require("cheerio");
const axios = require("axios");
const url = "http://fastfoodmacros.com/";

class ScraperService {
  getScraperService(req) {
    const result = {};

    return new Promise(scraperPromise);

    function scraperPromise(resolve, reject) {
      axios
        .get(url)
        .then(response => {
          const urls = []; // array of urls of each restaurant
          const html = response.data;
          let $ = cheerio.load(html);

          //list of restaurants from side nav dropdown
          const restaurantList = $(".pushy-submenu ul")
            .first()
            .children("li");
          restaurantList.each((index, restaurant) => {
            const fullUrl = `${url}${$(restaurant)
              .children("a")
              .attr("href")}`;

            urls.push(fullUrl);
          });

          return urls;
        })
        .then(urls => {
          let counter = 0;
          // go through each url, and grab appropriate data according to parameters
          urls.forEach(url => {
            return axios
              .get(url)
              .then(response => {
                counter++;
                const indexCollection = {};
                const nutriHTML = response.data;
                const $ = cheerio.load(nutriHTML);
                const currentRestaurant = $("h1")
                  .text()
                  .replace("Fast Food Macros", "")
                  .trim();

                $(".foodTable tbody")
                  .children("tr")
                  .first()
                  .children()
                  .each((i, label) => {
                    const title = $(label).text();
                    switch (title) {
                      case "Item":
                        indexCollection.item = i;
                        break;
                      case "Calories":
                        indexCollection.calories = i;
                        break;
                      case "Protein":
                        indexCollection.protein = i;
                        break;
                      case "Carbs":
                        indexCollection.carbs = i;
                        break;
                      case "Fat":
                        indexCollection.fat = i;
                        break;
                      default:
                        return;
                    }
                  });

                const itemTr = $(".foodTable tbody")
                  .children("tr")
                  .toArray();
                itemTr.splice(0, 2);

                itemTr.forEach(item => {
                  const calories = parseInt(
                    $(item).children()[indexCollection.calories].firstChild.data
                  );
                  const protein = parseInt(
                    $(item).children()[indexCollection.protein].firstChild.data
                  );
                  const fat = parseInt(
                    $(item).children()[indexCollection.fat].firstChild.data
                  );
                  const carbs = parseInt(
                    $(item).children()[indexCollection.carbs].firstChild.data
                  );

                  if (
                    calories <= parseInt(req.calories) &&
                    carbs <= parseInt(req.carbs) &&
                    fat <= parseInt(req.fat) &&
                    protein <= parseInt(req.protein)
                  ) {
                    const validResult = {
                      Item: $(item).children()[indexCollection.item].firstChild
                        .firstChild.data,
                      Calories: $(item).children()[indexCollection.calories]
                        .firstChild.data,
                      Carbs: $(item).children()[indexCollection.protein]
                        .firstChild.data,
                      Fat: $(item).children()[indexCollection.carbs].firstChild
                        .data
                    };
                    if (!result.hasOwnProperty(currentRestaurant)) {
                      result[currentRestaurant] = [];
                    }
                    result[currentRestaurant].push(validResult);
                  }
                });
                counter === urls.length && resolve(result);
              })
              .catch(() => {
                reject({
                  status: "error",
                  message: `There has been a problem retrieving data`
                });
              });
          });
        })
        .catch(() =>
          reject({ status: "error", message: "There has been a problem" })
        );
    }
  }
}

const scraperService = new ScraperService();
module.exports = scraperService;
