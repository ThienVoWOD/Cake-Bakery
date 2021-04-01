import React, { Component } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default class home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content-wrapper">
          <div className="container">
            <div className="content" style={{ backgroundColor: "white" }}></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
