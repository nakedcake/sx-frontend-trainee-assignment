import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { IndexPage } from "./componenents/pages/IndexPage";
import { StoryPage } from "./componenents/pages/StoryPage";
import { Layout } from "./componenents/Layout";
import { routes } from "./routes";
import { store } from "./services/store";

const pages = [
  { path: routes.index.getRoute(), component: IndexPage, exact: true },
  {
    path: routes.story.getRoute(":itemId"),
    component: StoryPage,
    exact: false,
  },
];

function App() {
  return (
    <Router>
      <Layout>
        <Provider store={store}>
          <Switch>
            {pages.map((props) => (
              <Route key={props.path} {...props} />
            ))}
          </Switch>
        </Provider>
      </Layout>
    </Router>
  );
}

export default App;
