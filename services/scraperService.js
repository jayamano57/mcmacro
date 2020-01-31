const cheerio = require("cheerio");
const axios = require("axios");
const url = "http://fastfoodmacros.com/";

class ScraperService {
  getScraperService(req) {
    return new Promise(promiseExecutor);
    function promiseExecutor(resolve, reject) {
      return axios
        .get(url)
        .then(response => {
          const html = response.data;
          let $ = cheerio.load(html);

          const restaurantList = $(".pushy-submenu ul")
            .first()
            .children("li");

          const urls = [];
          restaurantList.each((i, restaurant) => {
            const fullUrl = `${url}${$(restaurant)
              .children("a")
              .attr("href")}`;

            urls.push(fullUrl);
          });
          return urls;
        })
        .then(async urls => {
          const promises = [];
          urls.forEach(url => {
            promises.push(axios.get(url));
          });

          const allRestaurantData = await Promise.all(promises);
          return allRestaurantData;
        })
        .then(async allData => {
          const filteredPromises = [];
          allData.forEach(response => {
            filteredPromises.push(
              new Promise((resolve, reject) => {
                const indexCollection = {};
                const nutrHTML = response.data;
                let $ = cheerio.load(nutrHTML);

                const currentRestaurant = $("h1")
                  .text()
                  .replace("Fast Food Macros", "")
                  .trim();

                const result = {};
                result[currentRestaurant] = [];

                $(".foodTable tbody")
                  .children("tr")
                  .first()
                  .children()
                  .each((i, label) => {
                    //resultLength++;
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
                    const answer = {
                      Item: $(item).children()[indexCollection.item].firstChild
                        .firstChild.data,
                      Calories: $(item).children()[indexCollection.calories]
                        .firstChild.data,
                      Carbs: $(item).children()[indexCollection.protein]
                        .firstChild.data,
                      Fat: $(item).children()[indexCollection.carbs].firstChild
                        .data
                    };

                    result[currentRestaurant].push(answer);
                  }
                });
                resolve(result);
              })
            );
          });
          Promise.all(filteredPromises).then(response => {
            const finalResult = response.filter(restaurant => {
              const key = Object.keys(restaurant)[0];
              return restaurant[key].length > 0;
            });
            resolve(Object.assign(...finalResult));
          });
        })
        .catch(() => {
          reject({ status: "error", message: "Something went wrong" });
        });
    }
  }
}

const scraperService = new ScraperService();
module.exports = scraperService;
