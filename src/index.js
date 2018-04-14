import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DashboardUser from "./DashboardUser";
import DashboardAdmin from "./DashboardAdmin";
import registerServiceWorker from "./registerServiceWorker";
import { Route, Router, hashHistory } from "react-router";

hashHistory.replace("/app");

ReactDOM.render(
  <Router path="/" history={hashHistory}>
    <Route path="/app" component={App} />
    <Route path="/dashboard-user" component={DashboardUser} />
    <Route path="/dashboard-admin" component={DashboardAdmin} />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
