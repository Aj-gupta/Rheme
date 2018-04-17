import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DashboardUser from "./DashboardUser";
import DashboardAdmin from "./DashboardAdmin";
import registerServiceWorker from "./registerServiceWorker";
import { Route, Router, hashHistory } from "react-router";

(function() {
  if (
    localStorage.getItem("authToken") === null ||
    localStorage.getItem("authToken") === ""
  ) {
    hashHistory.replace("/app");
  } else {
    if (localStorage.getItem("modeOfLogin") === "user") {
      hashHistory.replace("/dashboard-user");
    } else {
      hashHistory.replace("/dashboard-admin");
    }
  }
})();

ReactDOM.render(
  <Router path="/" history={hashHistory}>
    <Route path="/app" component={App} />
    <Route path="/dashboard-user" component={DashboardUser} />
    <Route path="/dashboard-admin" component={DashboardAdmin} />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
