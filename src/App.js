import React, { Component } from "react";
import "./App.css";
import Header from "./components/shared/Header";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import RentalListing from "./components/rental/rental-listing/RentalListing";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/rentals" />}
                />
                <Route exact path="/rentals" component={RentalListing} />
                {/* <Route
                exact
                path="/rentals/:city/homes"
                component={RentalSearchListing}
              /> */}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
