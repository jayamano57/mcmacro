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
          const params = req;
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
        .then(urls => {
          const promises = [];
          urls.forEach(fullUrl => {
            const temp = new Promise((resolve, reject) => {
              axios.get(fullUrl).then(response => {
                const indexCollection = {};
                const nutrHTML = response.data;
                let $ = cheerio.load(nutrHTML);
                const currentRestaurant = $("h1")
                  .text()
                  .replace("Fast Food Macros", "")
                  .trim();
                if (!result.hasOwnProperty(currentRestaurant)) {
                  result[currentRestaurant] = [];
                }
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

                //
                for (let i = 0; i < itemTr.length; i++) {
                  const calories = parseInt(
                    $(itemTr[i]).children()[indexCollection.calories].firstChild
                      .data
                  );
                  const protein = parseInt(
                    $(itemTr[i]).children()[indexCollection.protein].firstChild
                      .data
                  );
                  const fat = parseInt(
                    $(itemTr[i]).children()[indexCollection.fat].firstChild.data
                  );
                  const carbs = parseInt(
                    $(itemTr[i]).children()[indexCollection.carbs].firstChild
                      .data
                  );

                  if (
                    // calories <= parseInt(req.calories) &&
                    // carbs <= parseInt(req.carbs) &&
                    // fat <= parseInt(req.fat) &&
                    // protein <= parseInt(req.protein)
                    calories <= parseInt(req.calories)
                  ) {
                    result[currentRestaurant].push({
                      Item: $(itemTr[i]).children()[indexCollection.item]
                        .firstChild.firstChild.data,
                      Calories: $(itemTr[i]).children()[
                        indexCollection.calories
                      ].firstChild.data,
                      Carbs: $(itemTr[i]).children()[indexCollection.protein]
                        .firstChild.data,
                      Fat: $(itemTr[i]).children()[indexCollection.carbs]
                        .firstChild.data
                    });
                  }

                  //return result
                }
                resolve(result);
                //
                // const answer = itemTr.map(item => {
                //   const calories = parseInt(
                //     $(item).children()[indexCollection.calories].firstChild.data
                //   );
                //   const protein = parseInt(
                //     $(item).children()[indexCollection.protein].firstChild.data
                //   );
                //   const fat = parseInt(
                //     $(item).children()[indexCollection.fat].firstChild.data
                //   );
                //   const carbs = parseInt(
                //     $(item).children()[indexCollection.carbs].firstChild.data
                //   );

                //   if (
                //     // calories <= parseInt(req.calories) &&
                //     // carbs <= parseInt(req.carbs) &&
                //     // fat <= parseInt(req.fat) &&
                //     // protein <= parseInt(req.protein)
                //     calories <= parseInt(req.calories)
                //   ) {
                //     result[currentRestaurant].push({
                //       Item: $(item).children()[indexCollection.item].firstChild
                //         .firstChild.data,
                //       Calories: $(item).children()[indexCollection.calories]
                //         .firstChild.data,
                //       Carbs: $(item).children()[indexCollection.protein]
                //         .firstChild.data,
                //       Fat: $(item).children()[indexCollection.carbs].firstChild
                //         .data
                //     });
                //   }
                // });
              });
            });

            promises.push(temp);
          });

          //try to get this without using a promise
          Promise.all(promises).then(result => {
            console.log(result);
            return result;
          });
        })
        .then(result => {
          console.log(result);
        })
        .catch(error => reject(error));
    }
  }
}

const scraperService = new ScraperService();
module.exports = scraperService;
