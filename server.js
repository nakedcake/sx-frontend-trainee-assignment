const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("cross-fetch");

require("custom-env").env(process.env.NODE_ENV);

const routes = require("./src/routes").routes;

const app = express();
const port = process.env.API_PORT;

app.use(cors());

// FRONTEND
app.use(express.static(path.join(__dirname, "dist")));

const serveApp = (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
};

app.get(routes.app.index.getRoute(), serveApp);
app.get(routes.app.story.getRoute(":storyId"), serveApp);

// API
app.get(routes.api.stories.getRoute(), (req, response) => {
  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((res) => res.json())
    .then((data) => data.slice(0, process.env.STORIES_LIST_LIMIT))
    .then((data) => response.json(data));
});

const idKey = "itemId";
app.get(routes.api.item.getRoute(`:${idKey}`), (req, response) => {
  fetch(`https://hacker-news.firebaseio.com/v0/item/${req.params[idKey]}.json`)
    .then((res) => res.json())
    .then((data) => response.json(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
