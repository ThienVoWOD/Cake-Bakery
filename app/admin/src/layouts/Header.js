import React, { Component } from "react";
// import { a } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }
  componentDidMount() {
    this.setState({
      name: JSON.parse(localStorage.getItem("data")).name,
      email: JSON.parse(localStorage.getItem("data")).email,
    });
  }
  logout() {
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <div className="main-header">
          <a href="/" className="logo">
            <span className="logo-mini">
              C<b>B</b>
            </span>
            <span className="logo-lg">
              Cake<b>Baker</b>
            </span>
          </a>
          <div className="navbar navbar-static-top">
            <a
              href="#"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                  >
                    {this.state.name}
                    <span className="caret" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a to="#">Thông tin cá nhân</a>
                    </li>
                    <li>
                      <a to="#">Đổi mật khẩu</a>
                    </li>
                    <li className="divider" />
                    <li>
                      <a onClick={this.logout}>Đăng xuất</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-sidebar">
          <div className="user-panel">
            <div className="info">
              <center>
                <h4>{this.state.email}</h4>
              </center>
            </div>
          </div>
          <div className="sidebar">
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">CHUNG</li>
              <li className="#">
                <a to="/">
                  <i className="fa fa-area-chart" />
                  <span>Tổng quan</span>
                </a>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="glyphicon glyphicon-shopping-cart" />
                  <span>Bánh</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="/cakes">
                      <i className="fa fa-circle-o" />
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a href="/categories">
                      <i className="fa fa-circle-o" />
                      Loại bánh
                    </a>
                  </li>
                  <li>
                    <a href="/cake/create">
                      <i className="fa fa-circle-o" />
                      Thêm mới
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/orders">
                  <i className="fa fa-money" />
                  <span>Hóa đơn</span>
                </a>
              </li>
              <li className="header">NÂNG CAO</li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-users" />
                  <span>Tài Khoản</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="/user/create">
                      <i className="fa fa-circle-o" />
                      Thêm mới
                    </a>
                  </li>
                  <li>
                    <a href="/users">
                      <i className="fa fa-circle-o" />
                      Tất cả
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-gear" />
                  <span>Thiết lập</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
