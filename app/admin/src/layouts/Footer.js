import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className="main-footer">
          <i className="fa fa-copyright" /> 2020{" "}
          <Link to="/">
            Cake<b>Baker</b>
          </Link>
          . All rights reserved.
        </div>
      </div>
    );
  }
}
