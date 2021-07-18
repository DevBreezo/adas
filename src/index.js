import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Root from "./components/root/Root";
import Register from "./components/register/Register";
import LostPassword from "./components/lost-password/LostPassword";
import Dashboard from "./components/dashboard/Dashboard";
import Test from "./components/test/Test";
import PageNotFound from "./components/page-not-found/PageNotFound";
import PrivateRoute from "./components/private-route/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <SnackbarProvider>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Root} />
            <Route path="/register" component={Register} />
            <Route path="/lost-password" component={LostPassword} />

            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/test" component={Test} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </SnackbarProvider>
      </Router>
    </>
  );
};

render(<App />, document.querySelector("#root"));
