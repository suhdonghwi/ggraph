import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

import MainPage from "../pages/MainPage";
import GraphPage from "../pages/GraphPage";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/graph" component={GraphPage} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;
