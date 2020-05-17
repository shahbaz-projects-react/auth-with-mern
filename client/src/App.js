import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/private-routes/private_route";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/user_actions";
import store from "./redux/store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
