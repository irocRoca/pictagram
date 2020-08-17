import React from "react";
import GridLayout from "./layout/Grid/Grid";
import "./app.module.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        {/* create an component to just store user data */}
        <Header />
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/profile/edit/:id" component={Account} exact />
          <Route path="/profile/:id" component={Profile} exact />
          <Route path="/login" component={Signin} exact />
          <Route path="/" exact>
            <GridLayout />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
