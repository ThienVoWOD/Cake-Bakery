import React, { Component } from "react";
import Login from "./contentComponents/login";
import Register from "./contentComponents/register";
import { connect } from "react-redux";
import { login, logout } from "../api/user";
const accountMenu = (logout) => (
  <ul className="dropdown-menu">
    <li>
      <a href="#">Thông tin tài khoản</a>
    </li>
    <li>
      <a onClick={() => logout()}>Đăng xuất</a>
    </li>
  </ul>
);

class headerComponent extends Component {
  login = (email, password) => {
    this.props.login(email, password);
  };
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <header className="main_header_area">
        <div className="top_header_area row m0">
          <div className="container">
            <div className="float-left">
              <center>
                <a>Chào mừng đến với Cake Bakery shop</a>
              </center>
            </div>
          </div>
        </div>
        <div className="main_menu_two">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src="img/logo-2.png" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="my_toggle_menu">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav justify-content-end">
                  <li>
                    <a href="/cart">Giỏ hàng</a>
                  </li>
                  {this.props.user.token === null ? (
                    <li className="dropdown submenu">
                      <a
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                      >
                        Tài khoản
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            data-toggle="modal"
                            data-target="#register"
                            href=""
                          >
                            Đăng kí
                          </a>
                        </li>
                        <li>
                          <a data-toggle="modal" data-target="#myModal" href="">
                            Đăng nhập
                          </a>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="dropdown submenu">
                      <a
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                      >
                        {this.props.user.email}
                      </a>
                      {accountMenu(this.logout)}
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <Login onSubmit={(email, password) => this.login(email, password)} />
        <Register />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login(email, password) {
    login(dispatch, email, password);
  },
  logout() {
    logout(dispatch);
  },
  // register(data, goToLogin) {
  //   register(dispatch, data, goToLogin);
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(headerComponent);
