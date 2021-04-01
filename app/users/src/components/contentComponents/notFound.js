import React, { Component } from "react";

export default class notFound extends Component {
  render() {
    return (
      <section className="error_area">
        <div className="container">
          <div className="error_inner">
            <div className="error_inner_text">
              <h3>404</h3>
              <h4>Oops! That page can’t be found</h4>
              <h5>Sorry, but the page you are looking for does not existing</h5>
              <a className="pink_btn" href="/">
                Go to home page
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
