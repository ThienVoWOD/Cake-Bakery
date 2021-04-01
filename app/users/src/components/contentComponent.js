import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./contentComponents/index";
import Cart from "./contentComponents/cart";
import NotFound from "./contentComponents/notFound";
import Checkout from "./contentComponents/checkout";

const ContentComponent = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/checkout" component={Checkout} />
    <Route component={NotFound} />
  </Switch>
);

export default ContentComponent;
