const scraperService = require("../services/scraperService");
module.exports = {
  getScrape: (req, res) => {
    scraperService
      .getScraperService(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => res.status(500).send(error));
  }
};
