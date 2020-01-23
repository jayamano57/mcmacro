const cheerio = require("cheerio");
const axios = require("axios");
const url =
  "http://www.themacroexperiment.com/blog/the-iifym-fast-food-restaurant-master-list";

class ScraperService {
  getScraperService(req) {
    return new Promise(scraperPromise);
    function scraperPromise(resolve, reject) {
      axios
        .get(url)
        .then(response => {
          const params = req;
          const html = response.data;
          const $ = cheerio.load(html);

          const paragraph = $(".blog-content")
            .last()
            .text();

          resolve(paragraph);
        })
        .catch(error => reject(error));
    }
  }
}

const scraperService = new ScraperService();
module.exports = scraperService;
