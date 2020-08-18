import React, { useEffect } from "react";
import GridLayout from "./layout/Grid/Grid";
import "./app.module.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";
import NotFound from "./components/NotFound/NotFound";
import GuardedRoute from "./config/GuardedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <Switch>
        <GuardedRoute
          path="/profile/edit/:id"
          component={Account}
          exact
          auth={user}
        />
        <GuardedRoute
          path="/profile/:id"
          component={Profile}
          exact
          auth={user}
        />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Signin} exact />
        <Route path="/" exact component={GridLayout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
