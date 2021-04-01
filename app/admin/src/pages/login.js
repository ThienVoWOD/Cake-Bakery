import React, { Component } from "react";
import url from "../routes/urlconfig";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogined: false,
    };
    this.submit_login = this.submit_login.bind(this);
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("role")) === "admin") {
      this.redirectLogined();
    }
  }
  redirectLogined = () => {
    this.setState({ isLogined: true });
  };
  redirectStart = () => {
    if (JSON.parse(localStorage.getItem("role")) == null) {
      alert("Đăng Nhập Thất Bại");
    } else {
      alert("Đăng Nhập Thành Công");
      this.setState({ isLogined: true });
    }
  };
  submit_login(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "POST",
      url: url + "/login",

      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("role", JSON.stringify(response.data.role));
      })
      .then(this.redirectStart)
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLogined === true) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div>
          <div className="login-box">
            <div className="login-logo">
              <a href="/">
                Cake<b>Baker.</b>
              </a>
            </div>
            <div className="login-box-body">
              <p className="login-box-msg">Bạn cần đăng nhập để tiếp tục</p>
              <form onSubmit={this.submit_login} method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    defaultValue=""
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <a href="#" className="pull-right">
                    Quên mật khẩu?
                  </a>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" name="remember" defaultValue="on" />
                    <span>Ghi nhớ</span>
                  </label>
                </div>
                <button type="submit" className="btn btn-info btn-block">
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
