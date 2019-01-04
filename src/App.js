import React, { Component } from "react";
import "./App.css";
import Header from "components/shared/Header";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import RentalListing from "components/rental/rental-listing/RentalListing";
import RentalDetail from "components/rental/rental-detail/RentalDetail";
import Login from "components/login/Login";
import Register from "components/register/Register";
import { LoggedInRoute } from "components/shared/auth/LoggedInRoute";
import RentalSearchListing from "components/rental/rental-listing/RentalSearchListing";

import * as actions from "actions";
import { ProtectedRoute } from "components/shared/auth/ProtectedRoute";
import BookingManage from "components/booking/booking-manage/BookingManage";
import RentalCreate from "components/rental/rental-create/RentalCreate";
import RentalManage from "./components/rental/rental-manage/RentalManage";
import RentalUpdate from "./components/rental/rental-detail/RentalUpdate";
import Profile from "./components/profile/Profile";

class App extends Component {
  componentWillMount() {
    store.dispatch(actions.checkAuthState());
  }

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
                <Route
                  exact
                  path="/rentals/:city/homes"
                  component={RentalSearchListing}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/manage"
                  component={RentalManage}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/new"
                  component={RentalCreate}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/:id"
                  component={RentalDetail}
                />
                <ProtectedRoute
                  exact
                  path="/bookings/manage"
                  component={BookingManage}
                />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute
                  exact
                  path="/rentals/:id/edit"
                  component={RentalUpdate}
                />
                <ProtectedRoute
                  exact
                  path="/user/profile"
                  component={Profile}
                />
                <LoggedInRoute exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
