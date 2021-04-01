import React, { Component } from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import User from "./pages/user/index";
import UserCreate from "./pages/user/create";
import ProductCreate from "./pages/product/create";
import Product from "./pages/product/index";
import Category from "./pages/category/index";
import Order from "./pages/bill/index";
import { AuthContext } from "./routes/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRouter from "./layouts/PrivateRouter";

export default class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={false}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRouter path="/home" component={Home} />
              <PrivateRouter path="/cakes" component={Product} />
              <PrivateRouter path="/cake/create" component={ProductCreate} />
              <PrivateRouter path="/users" component={User} />
              <PrivateRouter path="/user/create" component={UserCreate} />
              <PrivateRouter path="/categories" component={Category} />
              <PrivateRouter path="/orders" component={Order} />
              {/* <PrivateRouter path="/user/edit" component={UserEdit} /> */}
              <Route component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}
