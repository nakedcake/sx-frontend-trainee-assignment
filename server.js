const express = require("express");
const path = require("path");
const routes = require("./src/routes").routes;

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.static(path.join(__dirname, "dist")));

const serveApp = (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
};

app.get(routes.index.getRoute(), serveApp);
app.get(routes.story.getRoute(":storyId"), serveApp);

app.get("/api", (req, res) => {
  res.json({});
});
