import React from "react";
import { Router, Route } from "react-router-dom";
import Main from "./Main";
import ThankYou from "./ThankYou";
import { history } from "./history";

export default function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Main} />
      <Route exact path="/thankyou" component={ThankYou} />
    </Router>
  );
}
