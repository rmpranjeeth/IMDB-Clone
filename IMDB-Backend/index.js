const express = require("express");
const app = express();
const request = require("request");
const cors = require('cors');
require('dotenv').config();

const host = "http://www.omdbapi.com/?apikey=thewdb&";
app.use(cors());
function get_request_results_page(host, qs, res) {
  qs = qs || "";
  const url = host + qs;

  request(url, function (error, response, body) {
    if (!error && (response.statusCode === 200)) {
      let data = JSON.parse(body);
      data = data || {};
      res.json(data);
    } else {
      res.json("error")
    }
  });
}

function get_request_movie_page(host, qs, res) {
  qs = qs || "";
  const url = host + qs;
  const last_index = qs.length - 1;

  request(url, function (error, response, body) {
    if (!error && (response.statusCode === 200)) {
      let data = JSON.parse(body);
      data = data || {};
      res.json(data);
    } else {
      res.json("error");
    }
  });
}

app.get("/", function (req, res) {
  const searchItem = req.query.search;
  if (searchItem) {
    const qs1 = "s=" + searchItem;
    get_request_results_page(host, qs1, res);
  } else {
    res.json("Show search Page");
  }
});

app.get("/movies", function (req, res) {
  const searchItem = req.query.search;
  const qs1 = "s=" + searchItem;
  get_request_results_page(host, qs1, res);
});

app.get("/movie/:searchId", function (req, res) {
  const searchId = req.params.searchId;
  const qs1 = "i=" + searchId;
  get_request_movie_page(host, qs1, res);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
  console.log(`Server up on port ${PORT}`);
});